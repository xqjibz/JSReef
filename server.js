#!/usr/bin/env node
var     express         = require('express')
    ,   app             = express()
    ,   mongo           = require('mongoskin')
    ,   argv            = require('./options')
    ,   EventEmitter    = require('events').EventEmitter
    ,   util            = require('util')

var port = process.env.PORT || argv.port || 3000; // set our port
util.inherits(app, EventEmitter)
app.configure(function() {
    app.use(express.static(__dirname + '/public')) 	// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')) 					// log every request to the console
    app.use(express.bodyParser()) 						// pull information from html in POST
    app.use(express.methodOverride()) 					// simulate DELETE and PUT
});

// routes
require('./app/routes')(app)


// tanks/controllers array
var tanks = []
var db = mongo.db("mongodb://localhost/reef", {safe : true})
// start app
var server = app.listen(port, function(){
    //console.log('listening on ' + server.address().port)
    // six one 1/2 dozen the other, let's connect to mongo here.

    db.collection('tanks').findItems({}, function(err, results){
        tanks.push.apply(tanks, results)
        server.emit('ready')
    })

})

var serverReadyCB = require('./lib/server-ready-cb')(tanks, argv)
server.on('ready', serverReadyCB)


exports = module.exports = app