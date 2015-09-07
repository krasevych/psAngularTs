/// <reference path="../../.tmp/typings/tsd.d.ts" />

class AppController {
    /*@ngInject*/
    static config($locationProvider: angular.ILocationProvider,
                  $stateProvider: angular.ui.IStateProvider,
                  $mdThemingProvider: angular.material.IThemingProvider,
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
                        controller: 'HeaderCtrl',
                        controllerAs: 'HeaderCtrl'
                    },
                    main: {
                        template: '<div ui-view></div>'
                    },
                    footer: {
                        templateUrl: 'common/components/footer/footer.html'
                    }
                }
            });
        $mdThemingProvider.theme('default')
            .primaryPalette('blue');
    }
}

angular.module('testing', [
    'ngTouch',
    'ngSanitize',
    'ui.router',
    'ngMessages',
    'ipCookie',
    'ngMaterial'
])
    .controller('AppController', AppController)
    .config(AppController.config);

angular.element(document).ready(() =>
    angular.bootstrap(document, ['testing']));
