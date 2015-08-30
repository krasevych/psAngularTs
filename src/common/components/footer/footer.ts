/// <reference path="../../../../.tmp/typings/tsd.d.ts" />

class FooterCtrl {
    heading: string;

    constructor() {
        this.heading = 'Welcome to The New Angular Router Demo!!!';
    }
}
angular.module('testing')
    .controller('FooterCtrl', FooterCtrl);
