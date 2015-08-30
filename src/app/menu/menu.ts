/// <reference path="../../../.tmp/typings/tsd.d.ts" />

class MenuCtrl {
    heading: string;

    constructor() {
        this.heading = 'Welcome to The New Angular Router Demo!!!';
    }

    static config($stateProvider: any) {
        $stateProvider.state('menu', {
            parent: 'root',
            url: '/menu',
            templateUrl: 'app/menu/menu.html',
            controller: 'MenuCtrl',
            controllerAs: 'MenuCtrl'
        });
    }
}
angular.module('testing')
    .controller('MenuCtrl', MenuCtrl)
    .config(MenuCtrl.config);
