angular.module('JSReefApp', ['ngRoute', 'appRoutes', 'restangular',
   'SharedDataSvc', 'MainCtrl', 'LightingCtrl', 'PumpsCtrl', 'SettingsCtrl', 'OutletsCtrl'])

.config(['RestangularProvider', function(RestAngularProvider){
        RestAngularProvider.setBaseUrl('http://localhost:3000')
    }])
