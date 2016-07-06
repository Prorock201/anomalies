'use strict';

app.directive('chiDatepicker', function () {
    let directive = {
        scope: {
            curDate: '=ngModel',
            minDate: '=',
            calcDays: '&',
            isShowAllDays: '=',
            isDisableDate: '='
        },
        restrict: 'E',
        link: link,
        templateUrl: './components/datepicker/datepicker.html'
    };

    return directive;

    function link(scope, element, attrs) {
        scope.maxDate = '';
        scope.format = 'yyyy-MM-dd';
        scope.popup = {
            opened: false
        };
        scope.open= function() {
            scope.popup.opened = true;
        };
    }
});