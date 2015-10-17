///<reference path="../../app/index.d.ts"/>
/// <reference path="http.d.ts" />

class UserSvc {
    public user: any;

    constructor(private httpSvc: IHttpSvc,
                private $rootScope: angular.IRootScopeService) {
    }

    updateUser() {
        return new Promise((resolve: any, reject: any) => {
            // this.httpSvc.secureGet('user').success((res: any) => {
            this.httpSvc.secureGet('assets/jsons/user.json').success((res: any) => {
                this.user = res;
                this.$rootScope.$emit('user:updated', this.user);
                resolve(this.user);
            });
        });
    }

    getUser() {
        return _.isEmpty(this.user) ? this.updateUser() : Promise.resolve(this.user);
    }

    setUser(newUser: any) {
        this.user = newUser;
        this.$rootScope.$emit('user:updated', this.user);
    }
}

angular.module('testing')
    .service('userSvc', UserSvc);

