/// <reference path="../../../.tmp/typings/tsd.d.ts" />

class HttpSvc {
    public domain: string = 'test';
    public headers: any = {'header': 'qwerty'};
    private methods: string[] = ['get', 'post', 'put', 'delete'];
    private methodsHasData: string[] = ['post', 'put'];
    private secureHeaders: any = {'secure-header': 'qwerty'};

    constructor(private $http: angular.IHttpService) {
        this.createMethods();
        this.createSecureMethods();
    }

    hasData(method: string) {
        return this.methodsHasData.indexOf(method) !== -1;
    }

    setHeaders(method: string, headers: any, params: any[]) {
        let [data = {}, config = {}] = params;

        if (!this.hasData(method)) {
            config = data;
        }

        config.headers = _.extend(config.headers || {}, headers);
        return this.hasData(method) ? [data, config] : [config];
    }

    createMethods() {
        this.methods.forEach((method: string) => {
            this[method] = (url: string, ...params: any[]) => {
                params = this.setHeaders(method, this.headers, params);
                return this.$http[method](`${this.domain}/${url}`, ...params);
            };
        });
    }

    createSecureMethods() {
        this.methods.forEach((method: string) => {
            const newMethod = 'secure' + method.charAt(0).toUpperCase() + method.slice(1);
            this[newMethod] = (url: string, ...params: any[]) => {
                params = this.setHeaders(method, this.secureHeaders, params);
                return this[method](url, ...params);
            };
        });
    }
}

angular.module('testing')
    .service('HttpSvc', HttpSvc);
