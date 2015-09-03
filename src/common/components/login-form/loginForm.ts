/// <reference path="../../../../.tmp/typings/tsd.d.ts" />
/// <reference path="loginForm.d.ts" />

class LoginFormCtrl {
    public userData: loginForm.IUserData;

    canShowError(form: angular.IFormController, fieldName: string) {
        return form.$invalid && (form.$submitted || form[fieldName].$touched);
    }

    submit() {
        alert('submitted!!!')
    }
}

angular.module('testing')
    .directive('loginForm', () => ({
        controller: LoginFormCtrl,
        controllerAs: 'LoginFormCtrl',
        scope: {},
        templateUrl: 'common/components/login-form/loginForm.html'

    }));
