'use strict';
var app = angular.module('myApp',['ngResource', 'ngAnimate', 'ui.bootstrap'])

    .directive('svgCircle', function () {
        return {
            restrict: 'E',
            template:   '<svg width="100%" height="100%" style="position: absolute; top: 0px;">' +
            '<path style="transition: fill-opacity .6s ease" fill-rule="evenodd" fill-opacity=".7" fill="black" d="" />' +
            '<circle opacity="0" cx="" cy="" r=""/>' +
            '</svg>',
            link: function (scope, element) {
                scope.$watch(function () {
                    return scope.anomaly;
                }, function (value) {
                    if (value) {
                        var width = value.width * 7;
                        var firstCircle = 'M' + (+value.boundingX - width) + ',' + value.boundingY + ' A' + width + ','
                            + width + ' 0 1 1 ' + (+value.boundingX + width) + ',' + value.boundingY
                            + ' A' + width + ',' + width + ' 0 1 1 ' + (+value.boundingX - width) + ',' + value.boundingY;
                        angular.element(element[0].firstChild.firstChild).attr('d','M0 0 h881 v496 h-881z ' + firstCircle);

                        angular.element(element[0].firstChild.lastChild).attr('r', width);
                        angular.element(element[0].firstChild.lastChild).attr('cy', value.boundingY);
                        angular.element(element[0].firstChild.lastChild).attr('cx', value.boundingX);
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