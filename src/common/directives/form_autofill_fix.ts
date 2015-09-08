/// <reference path="../../../.tmp/typings/tsd.d.ts" />

angular.module('testing').directive('formAutofillFix', () =>
        (scope: angular.IScope, elem: JQuery, attrs: any) => {
            elem.prop('method', 'POST');

            if (attrs.ngSubmit) {
                setTimeout(() => {
                    elem.unbind('submit')
                        .bind('submit', (e: any) => {
                            e.preventDefault();
                            const arr: any = elem.find('input');
                            if (arr.length > 0) {
                                arr.triggerHandler('input')
                                    .triggerHandler('change')
                                    .triggerHandler('keydown');
                                scope.$apply(attrs.ngSubmit);
                            }
                        });
                }, 0);
            }
        }
);
