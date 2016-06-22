module.exports = function PWMParabola(){


    // convert one range to another, thank you arduino.cc, this is the map() function in the arduino API
    // x is the value to be converted
    // in_min, in_max is the range that you're coming in as
    // out_min, out_max is the new range that you're going to
    function convert_range (x, in_min,  in_max,  out_min,  out_max){
        return (x - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    }

    //start is the start of the rise, end is the end of the rise, PWM are the values to start and stop at.
    var _PWMParabola = function (startHour, startMinute, endHour, endMinute, startPWM, endPWM, oldvalue, dateIn){
        var     now = new Date()
            ,   current_hour = now.getHours()
            ,   startTime = new Date()
            ,   endTime = new Date()

        if(dateIn){
            now = dateIn
        }

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
            return 0 // if we're outside of the range, return the original value
        } else {
            var     pwmDelta = endPWM - startPWM
                ,   parabolaPhase = convert_range(current, start, end, 0, 180)

            //console.log('phase: ', parabolaPhase)
            var factor = 1
            if((parabolaPhase > 15) && (parabolaPhase < 165)){
                factor = 1.75
            }
            var returnValue = Math.floor((startPWM + (pwmDelta * Math.sin((parabolaPhase) * (Math.PI / 180)))) * factor)


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

    return _PWMParabola
}