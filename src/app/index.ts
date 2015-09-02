/// <reference path="../../.tmp/typings/tsd.d.ts" />

class AppController {
    /*@ngInject*/
    static config($locationProvider: angular.ILocationProvider,
                  $stateProvider: angular.ui.IStateProvider,
                  $mdIconProvider: angular.material.IIconProvider,
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
        $mdIconProvider.iconSet('fb', 'assets/images/icons/github.svg', 48)
            .defaultIconSet('/icons/github.svg', 24);
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
