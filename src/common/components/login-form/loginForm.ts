/// <reference path="../../../../.tmp/typings/tsd.d.ts" />
/// <reference path="../../services/auth.ts" />

class LoginFormCtrl {
    constructor(private AuthSvc: AuthSvc) {}

    canShowError(form: angular.IFormController,
                 fieldName: string) {
        return form.$invalid && (form.$submitted || form[fieldName].$touched);
    }

    submit(username: string, password: string) {
        this.AuthSvc.login(username, password);
    }
}

angular.module('testing')
    .directive('loginForm', () => ({
        controller: LoginFormCtrl,
        controllerAs: 'LoginFormCtrl',
        scope: {},
        templateUrl: 'common/components/login-form/loginForm.html'

    }));
