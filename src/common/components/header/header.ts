/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

class HeaderCtrl {
    public isShowLoginBtn: boolean = true;

    constructor(private $state: angular.ui.IStateService,
                private $rootScope: angular.IRootScopeService) {
        this.canShowLoginBtn();
        $rootScope.$on('$stateChangeSuccess', () => this.canShowLoginBtn());
    }

    canShowLoginBtn() {
        return this.isShowLoginBtn = this.$state.current.name !== 'login';
    }
}

angular.module('testing')
    .controller('HeaderCtrl', HeaderCtrl);
