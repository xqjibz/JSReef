#!/usr/bin/env node
var     five = require('johnny-five')
    ,   board = new five.Board({ repl : false})
    ,   whiteValue = 0
    ,   blueValue = 0
    ,   uvValue = 0
    ,   moonValue = 0
    ,   SunCalc = require('suncalc')

// convert one range to another, thank you arduino.cc, this is the map() function in the arduino API
// x is the value to be converted
// in_min, in_max is the range that you're coming in as
// out_min, out_max is the new range that you're going to
function convert_range (x, in_min,  in_max,  out_min,  out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}

//start is the start of the rise, end is the end of the rise, PWM are the values to start and stop at.
function PWMParabola(startHour, startMinute, endHour, endMinute, startPWM, endPWM, oldvalue){
    var     now = new Date()
        ,   current_hour = now.getHours()
        ,   startTime = new Date()
        ,   endTime = new Date()

    startTime.setHours(startHour)
    startTime.setMinutes(startMinute)
    endTime.setHours(endHour)
    endTime.setMinutes(endMinute)

    var     start = startTime.valueOf()
        ,   end = endTime.valueOf()

    if (start > end){ //Start is greater than End so its over midnight
        //Example: 2300hrs to 0200hrs
        if (current_hour < endHour){
            //console.log('adding on full days ms')
            start -= 86400000; //past midnight
        }
        if (current_hour >= startHour) end += 86400000; //before midnight
    }

    current = now.valueOf()
    //console.log('current: ', current)

    if ( current <= start || current >= end){
        return oldvalue // if we're outside of the range, return the original value
    } else {
        var     pwmDelta = endPWM - startPWM
            ,   parabolaPhase = convert_range(current, start, end, 0, 180)

            var returnValue = Math.floor((startPWM + (pwmDelta * Math.sin((parabolaPhase) * (Math.PI / 180)))))


            //constrain the values, once we're at the top, we're at the top or the bottom.
            if(returnValue < startPWM){
                return startPWM
            }
            if(returnValue > endPWM){
                return endPWM
            }
            return returnValue
    }
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
        whiteValue = PWMParabola(sunrise.getHours(),sunrise.getMinutes(),sunset.getHours(),sunset.getMinutes(),0,150,whiteValue)
        blueValue = PWMParabola(sunrise.getHours(),sunrise.getMinutes(),sunset.getHours(),sunset.getMinutes(),0,255,blueValue)
        uvValue = PWMParabola(sunrise.getHours(),sunrise.getMinutes(),sunset.getHours(),sunset.getMinutes(),0,255,uvValue)
        if(moonillumination > 0)
            moonValue = PWMParabola(moonrise.getHours(), moonrise.getMinutes(), moonset.getHours(), moonset.getMinutes(), 0, moonillumination, moonValue)


        console.log(now.toString() , ' white: ', whiteValue, ' blue: ', blueValue, ' uv: ', uvValue, ' moon: ', moonValue)
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
        moonrise = moontimes.rise
        moonset = moontimes.set ? moontimes.set : moontimes.rise
        var illumination = SunCalc.getMoonIllumination(rightnow)  // full moon illumination

        var moonillumination = (illumination.fraction * 20 ) < 1 ? 0 : (illumination.fraction * 20)
        moonillumination = blue.value > moonillumination ? 0 : moonillumination
        //console.log('moon illumination is: ', moonillumination)
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
    setInterval(setValues,60000) // every tenth second, lightning strikes are the smallest unit
    setInterval(operateLights,60000)
    setInterval(sunposition,60000)
    setInterval(function(){ debug = true}, 60000 * 60)
})
