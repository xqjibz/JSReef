var util = require('util')

module.exports = function(app, tanks) {

    // server routes
    app.get('/tanks', function(request, response){
        response.send(tanks)
    })
    app.get('/tanks/:id/outlets', function(request, response){
        console.log(request.params.id)
        var index = tanks.map(function(element) { return element._id}).indexOf(request.params.id)
        response.send(tanks[index].outlets)
    })

    // catch all route
    app.get('*', function(req, res) {
        console.log('sending index')
        //console.log(util.inspect(req, true, null))
        res.sendfile('./public/index.html'); // load our public/index file
    });

};
