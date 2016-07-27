'use strict';

var baseUrl = 'http://api.leadspotting.com';
var localUrl = 'http://192.168.2.95:8080';

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
    this.getDataForTable = function (id) {
        return this.http({
            url: localUrl + '/eyecatcher/getAnomalyConfiguration', 
            method: "GET", 
            params: {userid: id}
        });  
    };

}]);