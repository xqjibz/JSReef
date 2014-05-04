
angular.module('MainCtrl', []).controller('MainController', function ( $route, $scope, $location, Restangular, SharedData)  {



    Restangular.all('tanks').getList().then(function(data){
        $scope.tanks = data

    })


    console.log($scope.tanks)

    console.log('main controller')

    $scope.selectTankChange = function(){

        SharedData.saveSelectedTank($scope.tankSelection)
    }

})




