/// <reference path="../../../../.tmp/typings/tsd.d.ts" />
/// <reference path="loginForm.d.ts" />
/// <reference path="../../services/http.d.ts" />

class LoginFormCtrl {
    public userData: ILoginUserData;

    constructor(private HttpSvc: IHttpSvc) {
        console.log(HttpSvc);
        console.log(HttpSvc.get('/test'));
        console.log(HttpSvc.secureGet('/secure'));
    }

    canShowError(form: angular.IFormController,
                 fieldName: string) {
        return form.$invalid && (form.$submitted || form[fieldName].$touched);
    }

    submit() {

        alert('submitted!!!');
    }
}

angular.module('testing')
    .directive('loginForm', () => ({
        controller: LoginFormCtrl,
        controllerAs: 'LoginFormCtrl',
        scope: {},
        templateUrl: 'common/components/login-form/loginForm.html'

    }));
