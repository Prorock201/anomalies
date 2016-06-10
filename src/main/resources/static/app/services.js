'use strict';

app.factory('Stream', ['$resource', function ($resource) {
    
    return $resource('http://localhost:8080/eyecatcher//streams', {}, {
        'query': {method: 'GET', isArray: false }
    });

   /* return $resource('json.json', {}, {
        'query': {method: 'GET', isArray: false }
    });
*/

}]);