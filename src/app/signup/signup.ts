/// <reference path="../../../.tmp/typings/tsd.d.ts" />

class SignupCtrl {
    heading: string;

    constructor() {
        this.heading = 'Sign Up Page';
    }

    /*@ngInject*/
    static config($stateProvider: any) {
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
