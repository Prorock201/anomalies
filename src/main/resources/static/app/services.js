(function(angular) {
    var StreamFactory = function($resource) {
        return $resource('http://localhost:8080/streams', {}, {
            'query': {method: 'GET', isArray: false }
        });
    };

    StreamFactory.$inject = ['$resource'];
    angular.module("myApp.services").factory("Stream", StreamFactory);
}(angular));