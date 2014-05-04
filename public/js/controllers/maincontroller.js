
angular.module('MainCtrl', []).controller('MainController', function ( $route, $scope, $location, Restangular, SharedData)  {

    // prime this on the way in
    $scope.tankSelection = 'Select a tank to control'

    Restangular.all('tanks').getList().then(function(data){
        $scope.tanks = data

    })


    console.log($scope.tanks)

    console.log('main controller')

    $scope.selectTankChange = function(tankid){
        console.log('tank id: ' + tankid)
        SharedData.saveSelectedTank(tankid)
    }

})




