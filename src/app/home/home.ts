///<reference path="../index.d.ts"/>

class HomeCtrl {
    public heading: string;

    constructor() {
        this.heading = 'Home Page';
    }

    /*@ngInject*/
    static config($stateProvider: angular.ui.IStateProvider) {
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
