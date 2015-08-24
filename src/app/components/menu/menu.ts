export class MenuCtrl {
    heading: string;

    constructor() {
        this.heading = 'Welcome to The New Angular Router Demo!';
    }
}
angular.module('testing').controller('MenuCtrl', MenuCtrl);
