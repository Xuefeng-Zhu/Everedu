/**
 * Widget Footer Directive
 * code from https://github.com/rdash/rdash-angular
 */

angular
    .module('everedu')
    .directive('rdWidgetFooter', rdWidgetFooter);

function rdWidgetFooter() {
    var directive = {
        requires: '^rdWidget',
        transclude: true,
        template: '<div class="widget-footer" ng-transclude></div>',
        restrict: 'E'
    };
    return directive;
};