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

    /*@ngInject*/
    static routerError($log: angular.ILogService,
                       $rootScope: angular.IRootScopeService) {
        $rootScope.$on('$stateChangeError', (...params: any[]) => $log.error(params[5]));
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
    .config(AppController.config)
    .run(AppController.routerError);

angular.element(document).ready(() =>
    angular.bootstrap(document, ['testing']));
