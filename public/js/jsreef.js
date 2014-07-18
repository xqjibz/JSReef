angular.module('JSReefApp', ['ngRoute', 'appRoutes', 'restangular',
   'SharedDataSvc', 'MainCtrl', 'LightingCtrl', 'PumpsCtrl', 'SettingsCtrl', 'OutletsCtrl','SchedulesCtrl'])

.config(['RestangularProvider', function(RestAngularProvider){
        RestAngularProvider.setBaseUrl(document.location.origin)

    }])
