export class WelcomeController {
    heading: string;

    constructor() {
        this.heading = 'Welcome to The New Angular Router Demo!';
    }
}
angular.module('testing').controller('WelcomeController', WelcomeController);
