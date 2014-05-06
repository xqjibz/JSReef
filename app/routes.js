var util = require('util')

module.exports = function(app, tanks) {

    // server routes
    app.get('/tanks', function(request, response){
        console.log('sending tanks')
        console.log(util.inspect(tanks, true, null))
        response.send(tanks)
    })
    app.get('/tanks/:id/outlets', function(request, response){
        console.log(request.params.id)
        var index = tanks.map(function(element) { return element._id}).indexOf(request.params.id)
        response.send(tanks[index].outlets)
    })
    app.put('/tanks/:id/outlets/:outletid', function(request, response){
        var action = request.body.action.name
        console.log(request.params.outletid)
        var index = tanks.map(function(element) { return element._id}).indexOf(request.params.id)
        var outletIndex = tanks[index].outlets.map(function(element){return element.id}).indexOf(request.params.outletid)
        console.log('index of tank: ' + index)
        console.log('index of outlet : ' + outletIndex)
        console.log('action would be : '  + action)
        if(tanks[index].outlets[outletIndex].pin){
            var outlet = tanks[index].outlets[outletIndex].pin
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

        // this is not correct, though I don't need the object back, perhaps this route should be a get.
        // maybe send back led.status() here.
        response.send('OK')
    })
    // catch all route
    app.get('*', function(req, res) {
        console.log('sending index')
        //console.log(util.inspect(req, true, null))
        res.sendfile('./public/index.html'); // load our public/index file
    });

};
