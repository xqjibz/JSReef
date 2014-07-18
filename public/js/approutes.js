
angular.module('appRoutes', ['ngRoute', 'restangular']).config(['$routeProvider', '$locationProvider', 'RestangularProvider', function($routeProvider, $locationProvider, RestangularProvider) {

    $routeProvider
//        .when('/', {
//            templateUrl: 'index.html',
//            controller: 'MainController'
//
//        })
        .when('/lighting', {
            templateUrl: 'views/lighting',
            controller: 'LightingController'
        })
        .when('/pumps', {
            templateUrl: 'views/pumps',
            controller: 'PumpsController'
        })
        .when('/settings', {
            templateUrl: 'views/settings',
            controller: 'SettingsController'
        })
        .when('/outlets', {
            templateUrl: 'views/outlets',
            controller: 'OutletsController'
        })
        .when('/schedules', {
            templateUrl: 'views/schedules',
            controller: 'SchedulesController'
        })


        .otherwise({
            //templateUrl: 'index.html',
            controller: 'MainController',
            redirectTo:  '/'
        })


    $locationProvider.html5Mode(true);


    RestangularProvider.setDefaultRequestParams('jsonp', {callback: 'JSON_CALLBACK'});


}])