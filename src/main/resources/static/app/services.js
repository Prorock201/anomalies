'use strict';

app.factory('Stream', ['$resource', function ($resource) {


   /* http://env-5385371.jelastic.dogado.eu/
    return $resource('http://env-5385371.jelastic.dogado.eu//streams', {}, {
        'query': {method: 'GET', isArray: false }
    });*/

    return $resource('json.json', {}, {
        'query': {method: 'GET', isArray: false}
    });
}]);