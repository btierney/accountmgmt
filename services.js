angular.module('myApp.services', [])

.service ('alertSvc', function ($rootScope, $http, $interval){
var messages = [
    { type: 'alert-success', msg: 'Yay - Things ar going well' },
    { type: 'alert-warning', msg: 'Ruh Roh - Better be careful now.' },
    { type: 'alert-info', msg: 'PSST - Stuff is happening and you need to know' },
    { type: 'alert-danger', msg: 'Oh snap - Change a few things up and try submitting again.' }
];


    // START A TIMER TO CALL THE BACKEND FOR MESSAGES
    var DELAY = 3000;  // default time in seconds to update locations

    // CHECK FOR ALERTS EVERY 'DELAY' SECONDS
    var startAlertTimer = function (){
        $interval( function () {
            console.log ('checking for alerts ...');
            checkForAlerts();
        }, DELAY);
    }

    var checkForAlerts = function (){

        var level = Math.floor(Math.random() * 10) + 1
        if (level > 7){
            var alertIndex = Math.floor(Math.random() * 3) + 0
            var data = messages[alertIndex];
            data.timestamp = new Date().getTime();
            $rootScope.$broadcast ('SYSTEM_ALERT', data);
        } 
    }
    return {
        startAlertTimer : startAlertTimer
    }
})

.service ('accountSvc', function ($http){
    // MBAAS SERVICE FOR TESTING
    var baseurl = 'https://btierney-uxk2yjkejoz5vqet3nxpxoia-demos-dev.mbaas2.tom.redhatmobile.com/accounts';

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