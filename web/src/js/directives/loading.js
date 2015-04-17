/**
 * Loading Directive
 * @see http://tobiasahlin.com/spinkit/
 * code from https://github.com/rdash/rdash-angular
 */

angular
    .module('everedu')
    .directive('rdLoading', rdLoading);

function rdLoading() {
    var directive = {
        restrict: 'AE',
        template: '<div class="loading"><div class="double-bounce1"></div><div class="double-bounce2"></div></div>'
    };
    return directive;
};