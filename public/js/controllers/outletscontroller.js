
angular.module('OutletsCtrl', []).controller('OutletsController', function ( $route, $scope, $location, Restangular, SharedData)  {



    //Restangular.setBaseUrl('http://localhost:3000')


    $scope.updateOutlets = function(){
        $scope.selectedTank = SharedData.getSelectedTank()
        if($scope.selectedTank !== null){
            $scope.outlets = Restangular.all('tanks/' + $scope.selectedTank + '/outlets').getList().$object
            $scope.allOutlets = Restangular.all('tanks/'+ $scope.selectedTank + '/outlets').getList()
        }

    }

    $scope.operateOutlet = function(outletIndex, action){
        console.log(outletIndex)
        //TODO: figure out the restangular way of handling this properly inside the controller.
        Restangular.all('tanks/'+ $scope.selectedTank + '/outlets').getList().then(function(outlets){
                // match the outlet id here.
                outlets[outletIndex].action = { name : action }
                outlets[outletIndex].put()
            }
        )
    }

    $scope.$watch(function (){
        // just in case we need to add something else to the watch.
        return {
            tankSelector : SharedData.getSelectedTank()
        }
    }, $scope.updateOutlets, true)
})




