var util = require('util')

var returnIdPinDesc = function(element){
    return { id: element.id, pin: element.pin, description: element.description}
}

module.exports = function(app, tanks) {

    // server routes
    app.get('/tanks', function(request, response){
        console.log('sending tanks')
        //console.log(util.inspect(tanks, true, null))
        var returnValue = tanks.map(function(element) {return {_id : element._id} })
        console.log(returnValue)
        response.send(returnValue)
    })
    app.get('/tanks/:id/outlets', function(request, response){
        console.log('get /tanks/id/outlets')
        console.log(request.params.id)
        var index = tanks.map(function(element) { return element._id}).indexOf(request.params.id)

        var returnValue = tanks[index].outlets.map(returnIdPinDesc)
        response.send(returnValue)
    })

    // PUT is for turning them on and off.
    app.put('/tanks/:id/outlets/:outletid', function(request, response){
        var action = request.body.action.name

        var index = tanks.map(function(element) { return element._id}).indexOf(request.params.id)
        var outletIndex = tanks[index].outlets.map(function(element){return element.id}).indexOf(parseInt(request.params.outletid))
        // double checking here, we could call this out of order.
        if(tanks[index].outlets[outletIndex].arduinoPin){
            var outlet = tanks[index].outlets[outletIndex].arduinoPin
            if(action === 'on'){
                outlet.on()
            }
            if(action === 'off'){
                outlet.off()
            }
            if(action === 'toggle'){
                outlet.toggle()
            }

        }

        // send status 204, no content.
        response.send(204)
    })

    app.get('/tanks/:id/lighting', function(request, response){
        var index = tanks.map(function(element) { return element._id}).indexOf(request.params.id)

        var returnValue = tanks[index].lights.map(returnIdPinDesc)
        response.send(returnValue)
    })

    app.get('/tanks/:id/lighting/:lightid/action/:action', function(request, response){
        var     action = request.params.action
            ,   tankid = request.params.id
            ,   lightid = request.params.lightid

        var index = tanks.map(function(element) { return element._id}).indexOf(request.params.id)
        var lightIndex = tanks[index].lights.map(function(element){return element.id}).indexOf(parseInt(request.params.lightid))

        console.log('requesting: ' + action + ' for: ' + lightIndex)

        if(tanks[index].lights[lightIndex].arduinoPin){
            var light = tanks[index].lights[lightIndex].arduinoPin
            console.log('led status: ' + light.isOn)
            if(action === 'on'){
                // this seems nicer to the LED to me vs on()
                light.fadeIn()
                console.log('TURN ON')
                console.log(light.isOn)
            }
            if(action === 'off'){
                light.fadeOut()
                console.log('TURN OFF')
                console.log(light.isOn)
            }
            if(action === 'toggle'){
                console.log('toggle')
                console.log(light.isOn)
                //console.log(util.inspect(light, true, null))
                if(light.isOn){
                    console.log('fade out')
                    light.fadeOut()
                } else {
                    console.log('fade in')
                    light.fadeIn()
                }
            }
            if(action === 'fadedown'){
                if(light.value === null){
                    if(light.isOn){
                        light.brightness(255)
                    } else {
                        light.brightness(0)
                    }
                }

                light.brightness(light.value - 10)
                console.log(light.value)
            }

        }
        response.send(204)
    })

    app.get('/views/settings', function(request, response){
        response.render('settings')
    })
    app.get('/views/pumps', function(request, response){
        response.render('pumps')
    })
    app.get('/views/lighting', function(request, response){
        response.render('lighting')
    })
    app.get('/views/outlets', function(request, response){
        response.render('outlets')
    })
    app.get('/views/schedules', function(request, response){
        response.render('schedules')
    })
    // catch all
    app.get('*', function(req, res) {
        //res.sendfile('./public/index.html');
        res.render('index')
    });

};
