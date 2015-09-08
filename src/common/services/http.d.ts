/// <reference path="../../../.tmp/typings/tsd.d.ts" />

interface IHttpSvc {
    get<T>(method: string, config?: angular.IRequestConfig): angular.IHttpPromise<T>;
    post<T>(method: string, data?: any, config?: angular.IRequestConfig): angular.IHttpPromise<T>;
    delete<T>(method: string, config?: angular.IRequestConfig): angular.IHttpPromise<T>;
    secureGet<T>(method: string, config?: angular.IRequestConfig): angular.IHttpPromise<T>;
    securePost<T>(method: string, data?: any, config?: angular.IRequestConfig): angular.IHttpPromise<T>;
    secureDelete<T>(method: string, config?: angular.IRequestConfig): angular.IHttpPromise<T>;
    setSecureHeader(token: string): any;
}

