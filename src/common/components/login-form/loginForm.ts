/// <reference path="../../../../.tmp/typings/tsd.d.ts" />
/// <reference path="loginForm.d.ts" />

class LoginFormCtrl {
    public userData: loginForm.IUserData;

    constructor() {
    }
}

angular.module('testing')
    .directive('loginForm', (): angular.IDirective => ({
        controller: LoginFormCtrl,
        controllerAs: 'LoginFormCtrl',
        scope: {},
        templateUrl: 'common/components/login-form/loginForm.html'

    }));
