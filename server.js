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

server.on('ready', function(){
    console.log('server ready')
    // then let's move onto johnny 5, and the arduino

    var five = require('johnny-five')
    board = new five.Board()
    board.on('ready', function(){
        // arduino magic

        forEach(tanks, function(tank, index){
            // setup outlets
            if(tank.outlets){
                for(var i = 0 ; i < tank.outlets.length ; i++){
                    var tempPin = new five.pin({addr : tank.outlets[i].pin})
                    // this is so we can write to it in the routing object.
                    tanks[index].outlets[i].pin = tempPin

                }
            }

        })
    })

})


exports = module.exports = app