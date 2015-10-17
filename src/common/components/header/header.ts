///<reference path="../../../app/index.d.ts"/>
/// <reference path="../../services/auth.ts" />
/// <reference path="../../services/user.ts" />

class HeaderCtrl {
    public isShowLoginBtn: boolean = true;
    public user: any;

    constructor(private $state: angular.ui.IStateService,
                private userSvc: UserSvc,
                private authSvc: AuthSvc,
                private $rootScope: angular.IRootScopeService) {
        this.canShowLoginBtn();
        $rootScope.$on('$stateChangeSuccess', () => this.canShowLoginBtn());
        $rootScope.$on('user:updated', () => this.user = this.userSvc.user);
    }

    canShowLoginBtn() {
        return this.isShowLoginBtn = this.$state.current.name !== 'login';
    }

    logout() {
        this.authSvc.logout();
    }
}

angular.module('testing')
    .controller('HeaderCtrl', HeaderCtrl);
