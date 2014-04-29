
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
//        .when('/', {
//            templateUrl: 'index.html',
//            controller: 'MainController'
//
//        })
        .when('/lighting', {
            templateUrl: 'lighting.html',
            controller: 'LightingController'
        })
        .when('/pumps', {
            templateUrl: 'pumps.html',
            controller: 'PumpsController'
        })

        .otherwise({
            //templateUrl: 'index.html',
            controller: 'MainController',
            redirectTo:  '/'
        })


    $locationProvider.html5Mode(true);

}])
