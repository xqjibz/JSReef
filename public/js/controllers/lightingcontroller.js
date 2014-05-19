angular.module('LightingCtrl', []).controller('LightingController', function ( $route, $scope, $location, Restangular, SharedData)  {

    $scope.updateLighting = function(){
        $scope.selectedTank = SharedData.getSelectedTank()
        if($scope.selectedTank !== null){
            $scope.lighting = Restangular.all('tanks/' + $scope.selectedTank + '/lighting').getList().$object
            $scope.allLighting = Restangular.all('tanks/'+ $scope.selectedTank + '/lighting').getList()
        }

    }

    $scope.operateLight = function(index, action){
        console.log(action)

        Restangular.one('tanks', $scope.selectedTank).one('lighting', $scope.lighting[index].id).one('action', action).get()
    }

    $scope.$watch(function (){
        // just in case we need to add something else to the watch.
        return {
            tankSelector : SharedData.getSelectedTank()
        }
    }, $scope.updateLighting, true)

})




