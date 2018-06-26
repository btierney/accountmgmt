'use strict';

angular.module('myApp.notifications', ['ngRoute'])

.config (['$routeProvider', function ($routeProvider){
    $routeProvider.when ('/notifications', {
        templateUrl: 'notifications/notifications.html',
        controller: 'notificationsCtrl'
    });
}])

.controller ('notificationsCtrl', ['$scope','$sce', 'alertSvc', function($scope, $sce, alertSvc){
    // EVERY 3 SECONDS; SEE SERVICES.JS 'alertSvc' TO MODIFY
    alertSvc.startAlertTimer();
    console.log ('in notifications ctrl');

    $scope.$on ('SYSTEM_ALERT', function (event, data){
        $scope.alerts = data;
    })

    $scope.getCurrentAlert = function (item) {
        return JSON.stringify(item, null, 2);
    }
}]);
