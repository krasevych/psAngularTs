///<reference path="../../app/index.d.ts"/>

angular.module('testing')
    .directive('focusOn', () =>
        (scope: angular.IScope, element: JQuery) =>
            element[0].focus());
