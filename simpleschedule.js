#!/usr/bin/env node
var     five = require('johnny-five')
    ,   board = new five.Board({ repl : false})


board.on('ready', function () {
    // arduino magic
    console.log('arduino online')


    white = new five.Led({pin: 5})
    blue = new five.Led({pin: 3})
    uv = new five.Led({pin: 6})
    // I thought you had to do this, but I didn't, though, I still don't think the value should be 'null' on startup
    white.brightness(0)
    blue.brightness(0)
    uv.brightness(0)
    white.on()
    blue.on()
    uv.on()

    function lights(){
        now = new Date()
        var blueInterval, uvInterval, whiteInterval
        var fadeInterval1 = (120 * 60 * 1000) / 255
        var fadeInterval2 = (120 * 60 * 1000) / 200

        function lightning(led){
            led.brightness(0)
            led.on()
            strikeUp = setTimeout()
        }

        function strikeIn(){
            setInterval(function(){
                white.brightness(white.value + 2 > 255 ? 255 : white.value + 2)
                if(white.value === 255){
                    clearInterval(myInterval)
                    white.brightness(0)
                    // call the next one, or the next thing.
                }
            }, 1)
        }


        if((now.getHours() === 6) && (now.getMinutes() === 1)){
            console.log(now.toString(), ' turning on blue and uv')
            blueInterval = setInterval(function(){
                blue.brightness(blue.value + 1)
            }, fadeInterval)
            uvInterval = setInterval(function(){
                uv.brightness(uv.value + 1)
            }, fadeInterval1)
        }
        if((now.getHours() === 7) && (now.getMinutes() === 1)){
            console.log(now.toString(), ' turning on white')
            whiteInterval = setInterval(function(){
                white.brightness(white.value + 1)
            }, fadeInterval2)
        }
        if(blue.value === 255){
            console.log('clearing blue interval')
            clearInterval(blueInterval)
        }
        if(uv.value === 255){
            clearInterval(uvInterval)
        }
        if(white.value === 200){
            clearInterval(whiteInterval)
        }



    }

    setInterval(lights,60000)
})
