/// <reference path="../../../.tmp/typings/tsd.d.ts" />

class SignupCtrl {
    public heading: string;

    constructor() {
        this.heading = 'Sign Up Page';
    }

    /*@ngInject*/
    static config($stateProvider: angular.ui.IStateProvider) {
        $stateProvider.state('signup', {
            parent: 'root',
            url: '/signup',
            templateUrl: 'app/signup/signup.html',
            controller: 'SignupCtrl',
            controllerAs: 'SignupCtrl'
        });
    }
}

angular.module('testing')
    .controller('SignupCtrl', SignupCtrl)
    .config(SignupCtrl.config);
