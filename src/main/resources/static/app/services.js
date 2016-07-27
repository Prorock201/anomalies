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


app.service('Server', ['$http', function ($http) {

    this.http = $http;
    this.loginIn = function (username, password) {
        return this.http({
            url: localUrl + '/eyecatcher/login', 
            method: "POST", 
            data: {username: username, password: password}
        });
    };
    this.getStreams = function (id) {
        return this.http({
            url: localUrl + '/eyecatcher/streams', 
            method: "GET", 
            params: {userid: id}
        });
    };
    this.getStreamObject = function (id) {
        return this.http({
            url: localUrl + '/eyecatcher/getStreamObjectSummaryByStreamId', 
            method: "GET", 
            params: {streamid: id}
        });
    };
    this.getStreamObjectId = function (streamId, objectId) {
        return this.http({
            url: localUrl + '/eyecatcher/getStreamObjectSummaryByStreamIdAndObjectId', 
            method: "GET", 
            params: {streamid: streamId, objectid: objectId}
        });
    };
    this.getStreamObjectIdByDate = function (streamId, objectId, startDate, endDate) {
        return this.http({
            url: localUrl + '/eyecatcher/getStreamObjectSummaryByStreamIdAndObjectIdByDate', 
            method: "GET", 
            params: {streamid: streamId, objectid: objectId, from: startDate, to: endDate}
        });
    };
}]);