/// <reference path="../../../.tmp/typings/tsd.d.ts" />
/// <reference path="http.d.ts" />

class AuthSvc {
    constructor(private httpSvc: IHttpSvc) {}

    login(username: string, password: string) {
        return this.httpSvc.post('login', {username, password});
    }

    createUser(username: string, password: string) {
        return this.httpSvc.post('signup', {username, password});
    }
}

angular.module('testing')
    .service('authSvc', AuthSvc);

