angular.module('LightingCtrl', []).controller('LightingController', function ( $route, $scope, $location, Restangular, SharedData)  {

    $scope.updateLighting = function(){
        $scope.selectedTank = SharedData.getSelectedTank()
        if($scope.selectedTank !== null){
            $scope.lighting = Restangular.all('tanks/' + $scope.selectedTank + '/lighting').getList().$object
            $scope.allLighting = Restangular.all('tanks/'+ $scope.selectedTank + '/lighting').getList()

        }

    }

    $scope.options = {
            from    : 0
        ,   to      : 255
        ,   step    : 1
        ,   onstatechange : function(value) { console.log(value)  }
    }

    // this needs tied to the J5 value for the LED Object
    $scope.lightValue = 0


    $scope.operateLight = function(index, action){

        if(action === 'setbright'){
            // do something with socket.io here and quit $@$%%ing with routes.
            Restangular.one('tanks', $scope.selectedTank).one('lighting', $scope.lighting[index].id).one('action', action).one('brightness', $scope.lighting[index].pwmValue).get()
        } else {
            Restangular.one('tanks', $scope.selectedTank).one('lighting', $scope.lighting[index].id).one('action', action).one('brightness', null).get()
        }

    }

    $scope.$watch(function (){
        // just in case we need to add something else to the watch.
        return {
                tankSelector : SharedData.getSelectedTank()
            ,   allLighting  : $scope.allLighting
            //,   changeLighting : $scope.lighting
        }
    }, $scope.updateLighting, true)

})




