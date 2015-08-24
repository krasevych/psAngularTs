import './components/welcome/welcome.js';
import './components/menu/menu.js';

class AppController {
    constructor($router: any) {
        $router.config([
            {
                path: '/welcome',
                component: {
                    left: 'menu',
                    right: 'welcome'
                }
            },
            {path: '/flickr', component: 'flickr'},
            {path: '/settings', component: 'settings'}
        ]);
    }
}
angular.module('testing')
    .controller('AppController', AppController)
    .config(($componentLoaderProvider: any,
             $locationProvider: any) => {
        console.log($componentLoaderProvider);

        $componentLoaderProvider.setTemplateMapping((name: string) =>
            `app/components/${name}/${name}.html`);

        $componentLoaderProvider.setCtrlNameMapping((name: string) =>
            `${name[0].toUpperCase()}${name.substr(1)}Ctrl`);

        $locationProvider.html5Mode(true);
    });

