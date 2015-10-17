///<reference path="../../../app/index.d.ts"/>
/// <reference path="../../services/auth.ts" />
/// <reference path="../../services/user.ts" />

class LoginFormCtrl {
    constructor(private $state: angular.ui.IStateService,
                private authSvc: AuthSvc,
                private userSvc: UserSvc) {
    }

    canShowError(form: angular.IFormController,
                 fieldName: string) {
        return form.$invalid && (form.$submitted || form[fieldName].$touched);
    }

    submit(username: string,
           password: string) {
        this.authSvc.login(username, password).then(() => {
            this.userSvc.updateUser();
            this.$state.go('home');
        });
    }
}

angular.module('testing')
    .directive('loginForm', () => ({
        controller: LoginFormCtrl,
        controllerAs: 'LoginFormCtrl',
        scope: {},
        templateUrl: 'common/components/login_form/login_form.html'
    }));
