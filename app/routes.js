var util = require('util')

module.exports = function(app) {

    // server routes


    // catch all route
    app.get('*', function(req, res) {
        console.log('sending index')
        //console.log(util.inspect(req, true, null))
        res.sendfile('./public/index.html'); // load our public/index file
    });

};
