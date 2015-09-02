/// <reference path="../../../.tmp/typings/tsd.d.ts" />

class HomeCtrl {
    heading: string;

    constructor() {
        this.heading = 'Home Page';
    }

    /*@ngInject*/
    static config($stateProvider: any) {
        $stateProvider.state('home', {
            parent: 'root',
            url: '/',
            templateUrl: 'app/home/home.html',
            controller: 'HomeCtrl',
            controllerAs: 'HomeCtrl'
        });
    }
}

angular.module('testing')
    .controller('HomeCtrl', HomeCtrl)
    .config(HomeCtrl.config);
