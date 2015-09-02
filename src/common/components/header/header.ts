/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

class HeaderCtrl {
    header: string;

    constructor() {
        this.header = 'Header Component';
    }
}

angular.module('testing')
    .controller('HeaderCtrl', HeaderCtrl);
