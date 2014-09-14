
angular.module('SchedulesCtrl', []).controller('SchedulesController', function ( $route, $scope, $location, Restangular, SharedData)  {

    $scope.message = 'Schedules controller scope message'

    // we should prime the list of allowable schedule items
    // all outlets and all lights
    $scope.allDevices = Restangular.all('schedules').getList().$object
    console.log('after rest')
    console.log($scope.allDevices)

    $scope.saveSchedule = function _saveSchedule(){
        // do something here with the save
    }
})




