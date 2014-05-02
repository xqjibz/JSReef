
angular.module('OutletsCtrl', []).controller('OutletsController', function ( $route, $scope, $location, Restangular, SharedData)  {


    var selectedTank = SharedData.getSelectedTank()
    //Restangular.setBaseUrl('http://localhost:3000')
    $scope.outlets = Restangular.all('tanks/' + selectedTank + '/outlets').getList().$object


})




