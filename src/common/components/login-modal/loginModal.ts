/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

class LoginModalCtrl {
    public modal: angular.material.IDialogService;

    constructor($element: JQuery, $mdDialog: angular.material.IDialogService) {
        this.modal = $mdDialog;
        $element.on('click', this.openLoginModal.bind(this));
    }

    openLoginModal(ev: any) {
        this.modal.show({
            templateUrl: 'common/components/login-modal/loginModal.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }
}

angular.module('testing')
    .directive('loginModal', (): angular.IDirective => ({
        controller: LoginModalCtrl,
        controllerAs: 'LoginModalCtrl',
        scope: {},
        templateUrl: 'common/components/login-form/loginForm.html'

    }));
