// y  = a(x - h)^2 + k

/* y = y position
 * x = x position
 * h = height of parabola at perigee
 * k = time of day of perigee
 * a = ???
 */

//a = -1 //width of parabola
//h = 12 // perigee
//k = 100 // 100 percent
//
//for(var x =  1; x <= 24 ; x++){
//    //every 1/2 hour
//    y = (a * Math.pow((x - h),2)) + k
//    console.log('brightness :', y)
//}

var SunCalc = require('suncalc')




var util = require('util')
    ,   PWMParabola = require('./lib/pwmparabola')()
var rightnow = new Date() //new Date('10/30/2014 13:34:45')
rightnow.setHours(rightnow.getHours() + 1)
var times = SunCalc.getTimes(rightnow, 24.6, -81.5 )

console.log(util.inspect(times, true, null))
console.log('sunrise: ', times.sunrise.getHours(), ':', times.sunrise.getMinutes())
console.log(times.sunrise.toUTCString())
var position = SunCalc.getPosition(rightnow, 24.6, -81.5)
//console.log(util.inspect(position, true, null))
console.log('sun azimuth is: ', position.azimuth * (180 / Math.PI))
console.log('sun altitude is: ', position.altitude * (180 / Math.PI))
console.log(util.inspect(SunCalc.getMoonTimes(rightnow, 24.6, -81.5)))
console.log(util.inspect(SunCalc.getMoonIllumination(rightnow)))
var moonpos = SunCalc.getMoonPosition(rightnow, 24.6, -81.5)
console.log(moonpos.azimuth * (180 / Math.PI))
// get time from angle up from sunrise to 15 degrees up from sunrise.


//var now1 = new Date('10/21/2014 07:00')
//for(var x = 0 ; x < 54 ; x++){
//    var at = SunCalc.getTimes(now1, 24.6, -81.5)
//    var az = SunCalc.getPosition(now1, 24.6, -81.5)
//    console.log(now1.toString(), ' : ', az.azimuth * (180 / Math.PI))
//    now1.setMinutes(now1.getMinutes() + 15)
//
//}


var startPWM = 0
var endPWM = 255


var startHour = 9
var startMinute = 0
var endHour = 21
var endMinute = 0

var startTime = new Date()
startTime.setHours(startHour)
startTime.setMinutes(startMinute)

var endTime = new Date()
endTime.setHours(endHour)
endTime.setMinutes(endMinute)

function convert_range (x, in_min,  in_max,  out_min,  out_max){
    return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
}



//var now = new Date('2014/10/10 12:01')
//var current_hour = now.getHours()
//var start = startTime.valueOf() //(startTime.getHours() * 60) + startTime.getMinutes()
//var end = endTime.valueOf() //(endTime.getHours() * 60) + endTime.getMinutes()
//console.log('start: ', start, ' end: ', end)
//if (start > end) //Start is greater than End so its over midnight
//{
//    //Example: 2300hrs to 0200hrs
//    if (current_hour < endHour) start -= 1440; //past midnight
//    if (current_hour >= startHour) end += 1440; //before midnight
//}
//
//current = now.valueOf() //(now.getHours() * 60) + now.getMinutes()
//console.log('current: ', current)
//
//if ( current <= start || current >= end)
//    console.log('oldvalue returned')
//else
//{
//    var pwmDelta = endPWM - startPWM;
//    console.log(pwmDelta)
//    var parabolaPhase = convert_range(current, start, end, 0, 180)
//    console.log('phase: ',parabolaPhase)
//    console.log(startPWM + (pwmDelta * Math.sin((parabolaPhase) * (3.14 / 180))))
//}

console.log(PWMParabola(13,0,3,0,0,20,'oldvalue', new Date('10/1/2014 01:00')))
//
for(var i = 0 ; i < 24 ; i++){

    var dateO = new Date()
    dateO.setHours(13 + i)
    var value = PWMParabola(13,00,3,00,0,20,'oldvalue', dateO)
    console.log(dateO.getHours(),value)


}