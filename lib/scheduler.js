var     moment      = require('moment')
    ,   util        = require('util')

module.exports = function(tanks){

    function _scheduler(){
        // for each tank
        for(var i = 0 ; i < tanks.length ; i++){
            var tank = tanks[i]
            for(var j = 0 ; j < tank.schedules.length ; j++){
                var     schedule    = tank.schedules[j]
                    ,   on          = moment(schedule.on)
                    ,   off         = moment(schedule.off)
                // on events
                console.log('on : ', on , ' off: ', off)
                if(schedule.on){

                }
                // off events
                if(schedule.off){

                }

            }
        }
    }

    return _scheduler

}
