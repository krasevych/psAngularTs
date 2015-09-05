/// <reference path="../../../.tmp/typings/tsd.d.ts" />
/// <reference path="http.d.ts" />

class AuthSvc {
    constructor(private HttpSvc: IHttpSvc) {}

    login(username: string, password: string) {
        return this.HttpSvc.post('login', {username, password});
    }
}

angular.module('testing')
    .service('AuthSvc', AuthSvc);

