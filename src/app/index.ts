/// <reference path="../../.tmp/typings/tsd.d.ts" />
/// <reference path="components/welcome/welcome.ts" />
/// <reference path="components/menu/menu.ts" />

class AppController {
    constructor($router: any) {
        $router.config([
            {
                path: '/welcome',
                component: {
                    left: 'menu',
                    right: 'welcome'
                }
            }
        ]);
    }
}

angular.module('testing', [
    'ngCookies',
    'ngTouch',
    'ngSanitize',
    'ngNewRouter',
    'ngMaterial'
])
    .controller('AppController', AppController)
    .config(($componentLoaderProvider: any,
             $locationProvider: any) => {
        $componentLoaderProvider.setTemplateMapping((name: string) =>
            `app/components/${name}/${name}.html`);

        $componentLoaderProvider.setCtrlNameMapping((name: string) =>
            `${name[0].toUpperCase()}${name.substr(1)}Ctrl`);

        $locationProvider.html5Mode(true);
    });

angular.element(document).ready(() =>
    angular.bootstrap(document, ['testing']));
