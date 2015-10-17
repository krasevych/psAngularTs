///<reference path="../index.d.ts"/>
/// <reference path="../../common/services/auth.ts" />

class SignupCtrl {
    constructor(private authSvc: AuthSvc) {
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

    canShowError(form: angular.IFormController,
                 fieldName: string) {
        return form.$invalid && (form.$submitted || form[fieldName].$touched);
    }

    submit(username: string, password: string) {
        this.authSvc.createUser(username, password);
    }


}

angular.module('testing')
    .controller('SignupCtrl', SignupCtrl)
    .config(SignupCtrl.config);
