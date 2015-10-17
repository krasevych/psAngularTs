///<reference path="../../app/index.d.ts"/>
/// <reference path="http.d.ts" />
/// <reference path="user.ts" />


class AuthSvc {
    private cookieName: string = 'cookie_name';

    constructor(private $cacheFactory: angular.ICacheFactoryService,
                private httpSvc: IHttpSvc,
                private userSvc: UserSvc,
                private ipCookie: any) {
        this.restoreUser();
    }

    restoreUser() {
        const token = this.ipCookie(this.cookieName);
        if (token) {
            this.userSvc.updateUser();
        }
    }

    getCookieSettings() {
        const cookieSettings: any = {
            path: '/',
            expires: 365
        };
        return cookieSettings;
    }

    handlerResponse(res: any) {
        this.httpSvc.setSecureHeader(res.token);
        this.ipCookie(this.cookieName, res.token, this.getCookieSettings());
    }

    login(username: string, password: string) {
        return new Promise((resolve: any, reject: any) => {
            // this.httpSvc.post('login', {username, password}).success((res: any) => {
            this.httpSvc.get('assets/jsons/login.json').success((res: any) => {
                this.handlerResponse(res);
                resolve();
            });
        });
    }

    logout() {
        this.ipCookie.remove(this.cookieName, this.getCookieSettings());
        this.$cacheFactory.get('$http').removeAll();
        this.userSvc.setUser({});
    }

    createUser(username: string, password: string) {
        return new Promise((resolve: any, reject: any) => {
            this.httpSvc.post('signup', {username, password}).success((res: any) => {
                this.handlerResponse(res);
                resolve();
            });
        });
    }
}

angular.module('testing')
    .service('authSvc', AuthSvc);

