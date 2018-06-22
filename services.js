angular.module('myApp.services', [])

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