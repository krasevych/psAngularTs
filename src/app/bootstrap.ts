/// <reference path="../../.tmp/typings/tsd.d.ts" />
declare const System: any;
angular.module('testing', ['ngCookies', 'ngTouch', 'ngSanitize', 'ngNewRouter']);
System.import('./app/index.js').then(() => angular.bootstrap(document, ['testing']));
