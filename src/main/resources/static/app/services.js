'use strict';

app.factory('Stream', ['$resource', function ($resource) {
    
    return $resource('http://192.168.2.75:8080/eyecatcher/streams', {}, {
        'query': {method: 'GET', isArray: false }
    });
    
}]);

app.factory('Objects', ['$resource', function ($resource) {

    return $resource('http://192.168.2.75:8080/eyecatcher/objects', {}, {
        'query': {method: 'GET', isArray: true }
    });
    
}]);

app.factory('UpdateStream', ['$resource', function ($resource) {

    return $resource('http://192.168.2.75:8080/eyecatcher/updateStream', {}, {
        'query': {method: 'GET', isArray: false }
    });

}]);