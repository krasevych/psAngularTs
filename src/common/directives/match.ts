/// <reference path="../../../.tmp/typings/tsd.d.ts" />
/// <reference path="match.d.ts" />

angular.module('testing')
    .directive('match', () => ({
        require: 'ngModel',
        scope: {
            match: '='
        },
        link(scope: IMatchScope,
             element: JQuery,
             attrs: any,
             ctrl: IMatchNgModelCtrl) {

            ctrl.$validators.match = (modelValue: string) =>
            (_.isEmpty(scope.match) || ctrl.$pristine && _.isEmpty(modelValue)) || modelValue === scope.match;

            scope.$watch('match', () => ctrl.$validate());
        }
    }));
