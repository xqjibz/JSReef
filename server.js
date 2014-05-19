#!/usr/bin/env node
var     express         = require('express')
    ,   app             = express()

    ,   server          = require('http').createServer(app)
    ,   mongo           = require('mongoskin')
    ,   argv            = require('./options')
    ,   EventEmitter    = require('events').EventEmitter
    ,   util            = require('util')

var port = process.env.PORT || argv.port || 3000; // set our port
// this is where all of our tanks get stored and processed
var tanks = []
//TODO This connects here, and really should do something other than move on.
var db = mongo.db("mongodb://localhost/reef", {safe : true})
// socket.io listener
var io = require('socket.io').listen(server)
// events emitter for server
util.inherits(server, EventEmitter)




app.configure(function() {
    app.use(express.static(__dirname + '/public')) 	// set the static files location /public/img will be /img for users
    app.use(express.logger('dev')) 					// log every request to the console
    app.use(express.bodyParser()) 						// pull information from html in POST
    app.use(express.methodOverride()) 					// simulate DELETE and PUT
    app.set('views', __dirname + '/public/views')
    app.set('view engine', 'jade')
});

// routes

require('./app/routes')(app, tanks)

server.listen(port, function(){
    console.log('server ready')
    db.collection('tanks').findItems({}, function(err, results){
        tanks.push.apply(tanks, results)
        server.emit('ready')
        //console.log(util.inspect(tanks, true,null))
    })

})


var serverReadyCB = require('./lib/server-ready-cb')(tanks, argv)
server.on('ready', serverReadyCB)


exports = module.exports = app