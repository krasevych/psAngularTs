/// <reference path="../../../.tmp/typings/tsd.d.ts" />

class LoginCtrl {
    /*@ngInject*/
    static config($stateProvider: angular.ui.IStateProvider) {
        $stateProvider.state('login', {
            parent: 'root',
            url: '/login',
            templateUrl: 'app/login/login.html',
            controller: 'LoginCtrl',
            controllerAs: 'LoginCtrl'
        });
    }
}

angular.module('testing')
    .controller('LoginCtrl', LoginCtrl)
    .config(LoginCtrl.config);
