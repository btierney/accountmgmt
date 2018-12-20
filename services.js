angular.module('myApp.services', [])

.service ('alertSvc', function ($rootScope, $http, $interval, notificationSvc){

    // GET ALERTS FIRST TIME IN
    var promise = notificationSvc.getAllAlerts();
    promise.then (
        function (payload){
            $rootScope.$broadcast ('SYSTEM_ALERT', payload.data);
        }                
    )
    
    // START A TIMER TO CALL THE BACKEND FOR MESSAGES
    var DELAY = 10000;  // default time in seconds to update locations

    // CHECK FOR ALERTS EVERY 'DELAY' SECONDS
    var startAlertTimer = function (){
        $interval( function () {
            console.log ('checking for alerts ...');
            var promise = notificationSvc.getAllAlerts();
            promise.then (
                function (payload){
                    $rootScope.$broadcast ('SYSTEM_ALERT', payload.data);
                }                
            )
        }, DELAY);
    }

    return {
        startAlertTimer : startAlertTimer
    }
})

.service ('notificationSvc', function ($http){
    var baseurl = 'https://btierney-l6bibalrj33kqpzafvk4tzg7-live.mbaas2.eu.feedhenry.com/accounts/alerts';
    var currentAlert = {};

    var setCurrentAlert = function (alertItem){
        currentAlert = alertItem;
    }

    var getCurrentAlert = function (){
        return currentAlert;
    }

    var getAllAlerts = function (){
        return $http.get(baseurl);
    }

    return {
        getAllAlerts : getAllAlerts,
        getCurrentAlert : getCurrentAlert,
        setCurrentAlert : setCurrentAlert
    }
})

.service ('accountSvc', function ($http){
    // MBAAS SERVICE FOR TESTING
    var baseurl = 'https://btierney-l6bibalrj33kqpzafvk4tzg7-live.mbaas2.eu.feedhenry.com/accounts';

    var getAccountAll = function (){
        return $http.get(baseurl);
    }

    var getAccount = function (id){
        return $http.get(baseurl + '/' + id);
    }

    var createAccount = function (account) {
        return $http.post (baseurl, account);
    }

    var updateAccount = function (account){
        return $http.put (baseurl + '/' + account.id, account)
    }

    var deleteAccount = function (account){
        var acctID= account.id;
        return $http.delete (baseurl + '/' + acctID, acctID);
    }

    return {
        getAccountAll   : getAccountAll,
        getAccount      : getAccount,
        createAccount   : createAccount,
        updateAccount   : updateAccount,
        deleteAccount   : deleteAccount
    }
        
})