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
            '<text x="10" y="30" font-family="sans-serif" font-size="20px" fill="white" data=""></text>' +
            '<circle opacity="0" cx="" cy="" r=""/>' +
            '</svg>',
            link: function (scope, element) {
                var item = angular.fromJson(scope.index);
                scope.$watch(function () {
                    return item;
                }, 
                function (value) {
                    if (value) {
                        var width = value.width * 7 / 3;
                        var firstCircle = 'M' + (+value.boundingX/3 - width) + ',' + value.boundingY/3 + ' A' + width + ','
                            + width + ' 0 1 1 ' + (+value.boundingX/3 + width) + ',' + value.boundingY/3
                            + ' A' + width + ',' + width + ' 0 1 1 ' + (+value.boundingX/3 - width) + ',' + value.boundingY/3;

                        angular.element(element[0].firstChild.firstChild).attr('d','M0 0 h293 v219 h-293z ' + firstCircle);
                        angular.element(element[0].firstChild.lastChild).attr('r', width);
                        angular.element(element[0].firstChild.lastChild).attr('cy', value.boundingY/3);
                        angular.element(element[0].firstChild.lastChild).attr('cx', value.boundingX/3);
                        angular.element(element[0]).find('text').attr('data', value.amomalyText);
                    } else {
                        angular.element(element[0].firstChild.firstChild).attr('d', '');
                        angular.element(element[0].firstChild.lastChild).attr('r', '');
                        angular.element(element[0]).find('text').attr('data', '');
                    }

                    angular.element(element[0].firstChild.lastChild).on('mouseover', function () {
                        var text = angular.element(element[0]).find('text').attr('data')
                        angular.element(element[0].firstChild.firstChild).attr('fill-opacity', 0);
                        angular.element(element[0]).find('text').text(text);
                    });
                    angular.element(element[0].firstChild.lastChild).on('mouseleave', function () {
                        angular.element(element[0].firstChild.firstChild).attr('fill-opacity', '.7');
                        angular.element(element[0]).find('text').text('');
                    });
                });
            }
        };
    });