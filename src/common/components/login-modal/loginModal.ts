/// <reference path="../../../../.tmp/typings/tsd.d.ts" />
/// <reference path="loginModal.d.ts" />

class ModalCtrl {
    constructor(public $scope: IScopeModalCtrl,
                private $mdDialog: angular.material.IDialogService) {
        $scope.$mdDialog = $mdDialog;
    }
}

class LoginModalCtrl {
    constructor(private $element: JQuery,
                private $mdDialog: angular.material.IDialogService) {
        $element.on('click', this.openLoginModal.bind(this));
    }

    openLoginModal(event: any) {
        this.$mdDialog.show({
            controller: ModalCtrl,
            templateUrl: 'common/components/login-modal/loginModal.html',
            targetEvent: event,
            clickOutsideToClose: true
        });
    }
}

angular.module('testing')
    .directive('loginModal', (): angular.IDirective => ({
        controller: LoginModalCtrl,
        controllerAs: 'LoginModalCtrl',
        scope: {}
    }));
