
angular.module('OutletsCtrl', []).controller('OutletsController', function ( $route, $scope, $location, Restangular, SharedData)  {



    //Restangular.setBaseUrl('http://localhost:3000')


    $scope.updateOutlets = function(){
        $scope.selectedTank = SharedData.getSelectedTank()
        if($scope.selectedTank !== null){
            $scope.outlets = Restangular.all('tanks/' + $scope.selectedTank + '/outlets').getList().$object
        }

    }

    $scope.$watch(function (){
        // just in case we need to add something else to the watch.
        return {
            tankSelector : SharedData.getSelectedTank()
        }
    }, $scope.updateOutlets, true)
})




