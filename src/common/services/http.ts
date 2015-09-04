/// <reference path="../../../.tmp/typings/tsd.d.ts" />

class SecureHttpSvc {
    private methods: string[];
    private methodsHasData: string[];
    private headers: any;

    constructor(private $http: angular.IHttpService) {
        this.methods = ['get', 'post', 'put'];
        this.methodsHasData = ['post', 'put'];
        this.headers = {'secure-header': 'qwerty'};

        this.createRegularMethods();
    }

    hasData(method: string) {
        return this.methodsHasData.indexOf(method) !== -1;
    }

    createRegularMethods() {
        this.methods.forEach((method: string) =>
                this[method] = (url: string, ...params: any[]) => {
                    let [data = {}, config = {}] = params;
                    if (!this.hasData(method)) {
                        config = data;
                    }
                    config.headers = _.extend(config.headers || {}, this.headers);
                    return this.hasData(method) ?
                        this.$http[method](url, data, config) : this.$http[method](url, config);
                }
        );
    }

    setHeader(config) {
        config.headers = _.extend(config.headers || {}, this.headers);
    }

    createMethods(methods) {
        methods.forEach((method: string) =>
                this[method] = (url: string, config: any) => {
                    this.setHeader(config);
                    return this.$http[method](url, config);
                }
        );
    }

    createMethodsWidthData(methods) {
        methods.forEach((method: string) =>
                this[method] = (url: string, data: any, config: any) => {
                    this.setHeader(config);
                    return this.$http[method](url, data, config);
                }
        );
    }
}

angular.module('testing')
    .service('SecureHttpSvc', SecureHttpSvc);
