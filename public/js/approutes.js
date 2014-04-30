
angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider
//        .when('/', {
//            templateUrl: 'index.html',
//            controller: 'MainController'
//
//        })
        .when('/lighting', {
            templateUrl: 'views/lighting.html',
            controller: 'LightingController'
        })
        .when('/pumps', {
            templateUrl: 'views/pumps.html',
            controller: 'PumpsController'
        })
        .when('/settings', {
            templateUrl: 'views/settings.html',
            controller: 'SettingsController'
        })
        .when('/outlets', {
            templateUrl: 'views/outlets.html',
            controller: 'OutletsController'
        })

        .otherwise({
            //templateUrl: 'index.html',
            controller: 'MainController',
            redirectTo:  '/'
        })


    $locationProvider.html5Mode(true);

}])
