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
        scope.name = attrs.name;
        scope.maxDate = '';

        scope.open= function() {
            scope.popup.opened = true;
        };

        scope.setDate = function(year, month, day) {
            scope.curDate = new Date(year, month, day);
        };

        scope.format = 'yyyy-MM-dd';

        scope.popup = {
            opened: false
        };

        let tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        let afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        scope.events =
        [
        {
            date: tomorrow,
            status: 'full'
        },
        {
            date: afterTomorrow,
            status: 'partially'
        }
        ];

        scope.disabled = function(data) {
            let date = data.date,
            mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        };

        scope.getDayClass = function(date, mode) {
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);
                for (var i = 0; i < scope.events.length; i++) {
                    var currentDay = new Date(scope.events[i].date).setHours(0,0,0,0);
                    if (dayToCheck === currentDay) {
                        return scope.events[i].status;
                    }
                }
            }
            return '';
        };
    }
});