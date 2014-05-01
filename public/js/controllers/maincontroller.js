
angular.module('MainCtrl', []).controller('MainController', function ( $route, $scope, $location, Restangular)  {




    $scope.tanks = Restangular.all('tanks').getList().$object


    console.log($scope.tanks)

    console.log('main controller')

})




