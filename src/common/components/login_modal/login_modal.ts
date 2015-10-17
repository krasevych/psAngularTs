///<reference path="../../../app/index.d.ts"/>
/// <reference path="login_modal.d.ts" />

class ModalCtrl {
    /*@ngInject*/
    constructor(public $scope: IScopeModalCtrl,
                private $rootScope: angular.IRootScopeService,
                private $mdDialog: angular.material.IDialogService) {
        $scope.$mdDialog = $mdDialog;
        $rootScope.$on('user:updated', () => $mdDialog.hide());
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
            templateUrl: 'common/components/login_modal/login_modal.html',
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
