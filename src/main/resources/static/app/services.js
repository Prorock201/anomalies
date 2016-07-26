'use strict';

var baseUrl = 'http://api.leadspotting.com';
var localUrl = 'http://192.168.2.95:8080';

app.factory('Stream', ['$resource', function ($resource) {
    
    return $resource(baseUrl + '/eyecatcher/streams', {}, {
        'query': {method: 'GET', isArray: false }
    });
    
}]);

app.factory('Objects', ['$resource', function ($resource) {

    return $resource(baseUrl + '/eyecatcher/objects', {}, {
        'query': {method: 'GET', isArray: true }
    });
    
}]);

app.factory('UpdateStream', ['$resource', function ($resource) {

    return $resource(baseUrl + '/eyecatcher/updateStream', {}, {
        'query': {method: 'GET', isArray: false }
    });

}]);

app.factory('GetById', ['$resource', function ($resource) {

    return $resource(baseUrl + '/eyecatcher/getStreamObjectSummaryByStreamId', {}, {
        'query': {method: 'GET', isArray: false }
    });

}]);