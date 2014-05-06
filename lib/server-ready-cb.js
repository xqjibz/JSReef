var         util    = require('util')
// tanks is obvious, but argv just in case we need it down the line.
module.exports = function(tanks, argv){

    var _onServerReadyCB = function() {
        console.log('server ready')
        console.log(util.inspect(tanks, true, null))
        // then let's move onto johnny 5, and the arduino
        if(!argv.noboard){
            var five = require('johnny-five')
            board = new five.Board({ repl : false})
            board.on('ready', function () {
                // arduino magic

                tanks.forEach(function (tank, index, tanks) {
                    // setup outlets
                    console.log('foreach index: ' + index)
                    console.log('tanks 0 : ' + util.inspect(tanks[0], true, null))
                    if (tanks[index].outlets) {

                        for (var i = 0; i < tanks[index].outlets.length; i++) {
                            // LED might be better here.
                            //var tempPin = new five.Led({addr: tank.outlets[i].pin})
                            // this is so we can write to it in the routing object.
                            tanks[index].outlets[i].arduinoPin = new five.Led({pin: tank.outlets[i].pin})
                            // default to off
                            tanks[index].outlets[i].arduinoPin.off()


                        }
                    }
                    //console.log('tanks 0 : ' + util.inspect(tanks[0], true, null))

                })
            })

        }

    }
    return _onServerReadyCB
}

