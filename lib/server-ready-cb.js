
// tanks is obvious, but argv just in case we need it down the line.
module.exports = function(tanks, argv){

    var _onServerReadyCB = function() {
        console.log('server ready')
        // then let's move onto johnny 5, and the arduino
        if(!argv.noboard){
            var five = require('johnny-five')
            board = new five.Board()
            board.on('ready', function () {
                // arduino magic

                forEach(tanks, function (tank, index) {
                    // setup outlets
                    if (tank.outlets) {
                        for (var i = 0; i < tank.outlets.length; i++) {
                            // LED might be better here.
                            var tempPin = new five.led({addr: tank.outlets[i].pin})
                            // this is so we can write to it in the routing object.
                            tanks[index].outlets[i].pin = tempPin

                        }
                    }

                })
            })

        }

    }
    return _onServerReadyCB
}

