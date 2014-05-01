
angular.module('OutletsCtrl', []).controller('OutletsController', function ( $route, $scope, $location, Restangular, SharedData)  {


    $scope.selectedTank = SharedData.getSelectedTank()
    $scope.outlets = Restangular.all('/tank/' + $scope.selectedTank + '/outlets').getList().$object


})




