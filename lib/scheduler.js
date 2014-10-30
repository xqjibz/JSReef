var     moment      = require('moment')
    ,   util        = require('util')
    ,   gracePeriod = 5000// 5 second grace period for missing the schedule


function findLightID(array, id){
    for(var i = 0 ; i < array.length ; i++){
        if(array[i].id === id){
            return i
        }
    }
    return -1
}

module.exports = function(tanks){

    function _scheduler(){
        // for each tank
        for(var i = 0 ; i < tanks.length ; i++){
            var tank = tanks[i]
            for(var j = 0 ; j < tank.schedules.length ; j++){
                // this doesn't take into account for days, only hours.
                var     schedule    = tank.schedules[j]
                    ,   on          = schedule.on.split(':') // split once instead of twice
                    ,   onTime      = moment().hour(on[0]).minutes(on[1])
                    ,   off         = schedule.off.split(':')
                    ,   offTime     = moment().hour(off[0]).minutes(off[1])
                    ,   now         = moment()
                    ,   type        = schedule.type
                    ,   lightIndex  = -1
                    ,   time        = 2000 // 2 second default fade value
                // on events

                if(type === 'lights'){
                    //console.log('checking lights schedule for: ', schedule)

                    if((onTime.hour() === now.hour())){
                        //console.log('light : ', schedule.desc)
                        //console.log('searcdhing for the light. time: ', now.hour(), onTime.hour())
                        //fade in the light
                        lightIndex = findLightID(tank.lights, schedule.id)
                        //console.log('light index : ', lightIndex)
                        time = schedule.fadeIn * 60 * 1000 // in millis from minutes
                        if(lightIndex !== -1){
                            console.log(tank.lights[lightIndex].isOn, " : light status", " with fadeIn of:", time, " with scheduled fadeIn of :", schedule.fadeIn)
                            if(tank.lights[lightIndex].isOn === false){
                                console.log('turning on : ', tank.lights[lightIndex].description)
                                tank.lights[lightIndex].arduinoPin.fade(schedule.maxValue, time)
                                tank.lights[lightIndex].isOn = true
                            }

                        }
                    }
                    // off events

                    if(now.diff(offTime) > gracePeriod){
                        lightIndex = findLightID(tank.lights, schedule.id)
                        time = schedule.fadeIn * 60 * 1000 // in millis from minutes
                        if(lightIndex !== -1 ){
                            var isOn = tank.lights[lightIndex].isOn
                            if(isOn === true){
                                console.log('turning off : ', tank.lights[lightIndex].description, " with fadeIn of: ", time, " with a light status of: ", isOn, " with scheduled fadeIn of :", schedule.fadeIn)
                                tank.lights[lightIndex].arduinoPin.fade(0, time)
                            }

                        }
                    }
                }

            }
        }
    }

    return _scheduler

}
