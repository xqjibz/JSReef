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
    // catch all
    app.get('*', function(req, res) {
        //res.sendfile('./public/index.html');
        res.render('index')
    });

};
