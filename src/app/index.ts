/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="menu/menu.ts" />

class AppController {
    /*@ngInject*/
    static config($locationProvider: angular.ILocationProvider,
                  $stateProvider: angular.ui.IStateProvider,
                  $urlRouterProvider: angular.ui.IUrlRouterProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.when('', '/');
        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('root', {
                abstract: true,
                url: '',
                views: {
                    header: {
                        templateUrl: 'common/components/header/header.html',
                        controller: 'HeaderCtrl'
                    },
                    main: {
                        template: '<div ui-view></div>'
                    },
                    footer: {
                        templateUrl: 'common/components/footer/footer.html'
                    }
                }
            });
    }
}

angular.module('testing', [
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'ngMaterial'
])
    .controller('AppController', AppController)
    .config(AppController.config);

angular.element(document).ready(() =>
    angular.bootstrap(document, ['testing']));
