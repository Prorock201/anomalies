'use strict';
var app = angular.module('myApp',['ngResource', 'ngAnimate', 'ui.bootstrap'])

    .directive('svgCircle', function () {
        return {
            scope: {
                index: '@'
            },
            restrict: 'E',
            template:   '<svg width="100%" height="100%" style="position: absolute; top: 0px;">' +
            '<path style="transition: fill-opacity .6s ease" fill-rule="evenodd" fill-opacity=".7" fill="black" d="" />' +
            '<circle opacity="0" cx="" cy="" r=""/>' +
            '</svg>',
            link: function (scope, element) {

                scope.$watch(function () {
                    return scope.$parent.selectedStream.all_event[scope.index];
                }, function (value) {
                    if (value) {
                        var width = value.width * 7 / 3;
                        var firstCircle = 'M' + (+value.boundingX/3 - width) + ',' + value.boundingY/3 + ' A' + width + ','
                            + width + ' 0 1 1 ' + (+value.boundingX/3 + width) + ',' + value.boundingY/3
                            + ' A' + width + ',' + width + ' 0 1 1 ' + (+value.boundingX/3 - width) + ',' + value.boundingY/3;

                        angular.element(element[0].firstChild.firstChild).attr('d','M0 0 h293 v219 h-293z ' + firstCircle);
                        angular.element(element[0].firstChild.lastChild).attr('r', width);
                        angular.element(element[0].firstChild.lastChild).attr('cy', value.boundingY/3);
                        angular.element(element[0].firstChild.lastChild).attr('cx', value.boundingX/3);
                    } else {
                        angular.element(element[0].firstChild.firstChild).attr('d', '');
                        angular.element(element[0].firstChild.lastChild).attr('r', '');
                    }

                    angular.element(element[0].firstChild.lastChild).on('mouseover', function () {
                        angular.element(element[0].firstChild.firstChild).attr('fill-opacity', 0);
                    });
                    angular.element(element[0].firstChild.lastChild).on('mouseleave', function () {
                        angular.element(element[0].firstChild.firstChild).attr('fill-opacity', '.7');
                    });
                });
            }
        };
    });