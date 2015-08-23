/// <reference path="../../.tmp/typings/tsd.d.ts" />
import './components/welcome/welcome.js';

class AppController {
    constructor($router:any) {
        $router.config([
            {path: '/welcome', component: 'welcome'},
            {path: '/flickr', component: 'flickr'},
            {path: '/settings', component: 'settings'}
        ]);
    }
}
angular.module('testing')
    .controller('AppController', AppController)
    .config(($componentLoaderProvider:any, $locationProvider:any) => {
        $componentLoaderProvider.setTemplateMapping((name:string) =>
        'app/components/' + name + '/' + name + '.html');

        $locationProvider.html5Mode(true);
    });

