/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

class HeaderCtrl {
    heading: string;

    constructor() {
        this.heading = 'Welcome to The New Angular Router Demo!';
    }
}
angular.module('testing')
    .controller('HeaderCtrl', HeaderCtrl);
