///<reference path="../../app/index.d.ts"/>

interface IMatchScope extends angular.IScope {
    match: string;
}
interface IMatchModelValidators extends angular.IModelValidators {
    match(modelValue: string): any;
}
interface IMatchNgModelCtrl extends angular.INgModelController {
    $validators: IMatchModelValidators;
}
