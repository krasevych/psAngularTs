/// <reference path="../../../../.tmp/typings/tsd.d.ts" />
/// <reference path="../../services/auth.ts" />

class LoginFormCtrl {
    constructor(private authSvc: AuthSvc) {}

    canShowError(form: angular.IFormController,
                 fieldName: string) {
        return form.$invalid && (form.$submitted || form[fieldName].$touched);
    }

    submit(username: string, password: string) {
        this.authSvc.login(username, password);
    }
}

angular.module('testing')
    .directive('loginForm', () => ({
        restrict: 'AE',
        controller: LoginFormCtrl,
        controllerAs: 'LoginFormCtrl',
        scope: {},
        templateUrl: 'common/components/login_form/login_form.html'

    }));