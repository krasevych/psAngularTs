/// <reference path="../../.tmp/typings/tsd.d.ts" />
import welcome from 'components/welcome/welcome';
import menu from 'components/menu/menu';

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
    welcome.name,
    menu.name,
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

angular.bootstrap(document, ['testing']);
