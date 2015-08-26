class MenuCtrl {
    heading: string;

    constructor() {
        this.heading = 'Welcome to The New Angular Router Demo!';
    }
}
export default angular.module('menu', [])
    .controller('MenuCtrl', MenuCtrl);
