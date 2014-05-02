angular.module('JSReefApp', ['ngRoute', 'appRoutes', 'restangular',
   'SharedDataSvc', 'MainCtrl', 'LightingCtrl', 'PumpsCtrl', 'SettingsCtrl', 'OutletsCtrl'])

.config(['RestangularProvider', function(RestAngularProvider){
        RestAngularProvider.setBaseUrl(document.location.origin)

    }])
