'use strict'

angular.module('streamApp').factory('Stream', function($resource) {
    return $resource('/streams/:id'), { id: '@_id' }, {
        update: {
            method: 'PUT'
        }
        
});

angular.module('streamApp').controller('StreamContoller', function ($scope, Stream) {

    var stream = Stream.get

    }
)