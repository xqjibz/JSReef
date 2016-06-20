#!/usr/bin/env node
var     five = require('johnny-five')
    ,   board = new five.Board({ repl : false})
    ,   whiteValue = 0
    ,   blueValue = 0
    ,   uvValue = 0
    ,   moonValue = 0
    ,   SunCalc = require('suncalc')
    ,   PWMParabola = require('./lib/pwmparabola')()


function convert_range (x, in_min,  in_max,  out_min,  out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}







board.on('ready', function () {
    // arduino magic
    console.log('arduino online')


    white = new five.Led({pin: 5})
    blue = new five.Led({pin: 3})
    uv = new five.Led({pin: 6})
    moon = new five.Led({pin : 9})
    // I thought you had to do this, but I didn't, though, I still don't think the value should be 'null' on startup
    white.brightness(0)
    blue.brightness(0)
    uv.brightness(0)
    moon.brightness(0)
    white.on()
    blue.on()
    uv.on()
    moon.on()
    var sunrise, sunset, moonrise, moonset, moonillumination
    var debug = true



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

    function setValues(){
        var now = new Date()
        //sunrise is at 9 am for now, sunset at 11 pm
        whiteValue = PWMParabola(sunrise.getHours(), sunrise.getMinutes(), sunset.getHours(), sunset.getMinutes(), 0, 150, whiteValue)
        blueValue = PWMParabola(sunrise.getHours(), sunrise.getMinutes(), sunset.getHours(), sunset.getMinutes(), 0, 254, blueValue)
        uvValue = PWMParabola(sunrise.getHours(), sunrise.getMinutes(), sunset.getHours(), sunset.getMinutes(), 0, 254, uvValue)
        if(moonillumination > 0){
            console.log('moon rise: ', moonrise.getHours(), ':', moonrise.getMinutes(), ' moon set: ', moonset.getHours(), ':', moonset.getMinutes())
            moonValue = PWMParabola(moonrise.getHours(), moonrise.getMinutes(), moonset.getHours(), moonset.getMinutes(), 0, moonillumination, moonValue)
            // no need to run the moon lights when blue is already larger
            moonValue = blueValue > moonValue ? 0 : moonValue
        }




    }

    function debugLights(){
        console.log(new Date().toString() , ' white: ', whiteValue, ' blue: ', blueValue, ' uv: ', uvValue, ' moon: ', moonValue)
    }

    function operateLights(){
        white.brightness(whiteValue)
        blue.brightness(blueValue)
        uv.brightness(uvValue)
        moon.brightness(moonValue)
    }
//




    function sunposition(){
        var rightnow = new Date()
        var times = SunCalc.getTimes(rightnow, 24.6, -81.5 )
        var position = SunCalc.getPosition(rightnow, 24.6, -81.5)
        var moontimes = SunCalc.getMoonTimes(rightnow, 24.6, -81.5)
        sunrise = times.sunrise
        sunset = times.sunset
        moonrise = moontimes.rise ||  moontimes.set
        moonset = moontimes.set ? moontimes.set : moontimes.rise
        var illumination = SunCalc.getMoonIllumination(rightnow)  // full moon illumination

        moonillumination = (illumination.fraction * 20 ) < 1 ? 0 : (illumination.fraction * 20)

        moonillumination = blue.value > moonillumination ? 0 : moonillumination
        console.log('moon illumination is: ', moonillumination)
        //console.log('sun azimuth is: ', position.azimuth * (180 / Math.PI))
        //console.log('sun altitude is: ', position.altitude * (180 / Math.PI))
        //var moonposition = SunCalc.getMoonPosition(rightnow, 24.6, -81.5)
        //console.log('moon altitude is: ', moonposition.altitude)
        //console.log('moon illuminated fraction is:  ', SunCalc.getMoonIllumination(rightnow))

        if(debug){
            console.log('sunrise:   ', sunrise.toString())
            console.log('sunset:    ', sunset.toString())
            console.log('moonrise:  ', moonrise.toString())
            console.log('moonset:   ', moonset.toString())
            console.log('=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=')
            console.log('moon fraction: ', illumination.fraction)
            debug = false
        }
    }

    sunposition()
    setValues()
    operateLights()
    setInterval(setValues,1000) // every tenth second, lightning strikes are the smallest unit
    setInterval(operateLights,1000)
    setInterval(debugLights, 60000)
    setInterval(sunposition,1000 * 60)
    setInterval(function(){ debug = true}, 60000 * 60)
})
