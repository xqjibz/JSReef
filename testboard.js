var     five = require('johnny-five')
                ,   board = new five.Board()


board.on('ready', function(){
    var white = new five.Led({ pin: 5 })
        ,   blue = new five.Led({pin : 3})
        ,   uv  = new five.Led({pin : 6})
        ,   moon = new five.Led({pin : 9})
    board.repl.inject({white : white, blue : blue, uv : uv})

})






