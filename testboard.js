var     five = require('johnny-five')
                ,   board = new five.Board()


board.on('ready', function(){
    var led = new five.Led({ pin: 3 })

    board.repl.inject({led : led})

})






