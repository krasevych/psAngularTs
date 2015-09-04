/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

class LoginModalCtrl {
    constructor(
        private $element: JQuery,
        private $mdDialog: angular.material.IDialogService
    ) {
        $element.on('click', this.openLoginModal.bind(this));
    }

    openLoginModal(ev: any) {
        this.$mdDialog.show({
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
