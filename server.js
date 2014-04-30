#!/usr/bin/env node
var     express         = require('express')
    ,   app             = express()
    ,   mongo           = require('mongoskin')
    ,   argv            = require('./options')
    ,   EventEmitter    = require('events').EventEmitter

var port = process.env.PORT || argv.port || 3000; // set our port

app.configure(function() {
    app.use(express.static(__dirname + '/public')) 	// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')) 					// log every request to the console
    app.use(express.bodyParser()) 						// pull information from html in POST
    app.use(express.methodOverride()) 					// simulate DELETE and PUT
});

// routes
require('./app/routes')(app)

// start app
var server = app.listen(port, function(){
    //console.log('listening on ' + server.address().port)
    // six one 1/2 dozen the other, let's connect to mongo here.

    // find the tanks we're controlling, and we'll put them into an array


    // then let's move onto johnny 5, and the arduino

})

exports = module.exports = app