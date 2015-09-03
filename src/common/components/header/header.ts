/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

class HeaderCtrl {
    modal: angular.material.IDialogService;

    constructor($mdDialog: angular.material.IDialogService) {
        this.modal = $mdDialog;
    }

    openLoginModal(ev: any) {
        this.modal.show({
            template: '<md-dialog>hello</md-dialog>',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        });
    }
}

angular.module('testing')
    .controller('HeaderCtrl', HeaderCtrl);
