class WelcomeCtrl {
    heading: string;

    constructor() {
        this.heading = 'Welcome to The New Angular Router Demo!';
    }
}
export default angular.module('welcome', [])
    .controller('WelcomeCtrl', WelcomeCtrl);
