'use strict';

app.controller('AppController', ['$scope', 'Server', '$interval', '$parse', function($scope, Server, $interval, $parse) {

    $scope.streams = [];
    $scope.image = '';
    $scope.selectedStream = {};
    $scope.selectedEvents = [];
    $scope.renderedEvents = [];
    $scope.dateFilter = {};
    $scope.uniqAnomaliesByEventType = [];
    $scope.uniqAllEventsByEventType = [];
    $scope.showAnomaliesEvents = false;
    $scope.showAllEvents = false;
    $scope.itemPerPage = 9;
    $scope.paginationMaxSize = 5;
    $scope.currentPage = 1;
    $scope.bigTotalItems = 0;
    $scope.server = Server;
    $scope.$interval = $interval;
    $scope.$parse = $parse;
    $scope.autoRefreshDelay = 20000;
    $scope.allAnomalies = {
        anomalies: [],
        allEvents: [],
    };
    $scope.user = {
        response: false,
        id: 0
    };

    $scope.baseUrl = 'http://api.leadspotting.com';
    $scope.localUrl = 'http://192.168.2.95:8080';

    $scope.$watch('dateFilter', function() {
      if (!$scope.dateFilter.startdate) return;
      if (!$scope.dateFilter.enddate || $scope.dateFilter.enddate <= $scope.dateFilter.startdate) {
        $scope.dateFilter.enddate = new Date($scope.dateFilter.startdate);
      } 
    }, true);

    $(window).on('fancyboxClosed', function(){
        $scope.dateFilter.startdate = '';
        $scope.dateFilter.enddate = '';
        $scope.renderedEvents = [];
        $scope.currentPage = 1;
        $scope.showAnomaliesEvents = false;
        $scope.showAllEvents = false;
    });

    $scope.loginIn = function() {
        $scope.server
            .loginIn($scope.username, $scope.password)
            .then($scope.sendStreamsRequest)
            .then($scope.startAutoRefresh);
    };

    $scope.startAutoRefresh = function(data) {
        if (data) {
            $scope.$interval($scope.sendStreamsRequest.bind(null, data), $scope.autoRefreshDelay);
        } else {
            var error = {};
            error.statusText = 'You have to login first';
            $scope.getError(error);
        }
    };

    $scope.sendStreamsRequest = function(data) {
        $scope.user = $parse('data.id')(data) ? data.data : $scope.user;
        if ($scope.user.id != 0) {
            return $scope.server
                    .getStreams($scope.user.id)
                    .then($scope.getStreams)
                    .then(null, $scope.getError);
        } else {
            return false;
        }
    };

    $scope.getStreams = function(data) {
        $scope.streams = data.data ? data.data : [];
        return data;
    };

    $scope.selectStream = function (stream) {
        $scope.selectedStream = stream;
        $scope.image = stream.image
        $scope
            .getStreamObject(stream.id)
            .then($scope.filterResponseData)
            .then(null, $scope.getError);
    };

    $scope.toggleDropDown = function(event) {
        $scope[event] = !$scope[event];
    };

    $scope.findEventType = function(array, item) {
        var sum = 0;
        if (item) {
            sum = _.find($scope.allAnomalies[array], {name: item}).count;
        } else {
            sum = $scope.allAnomalies[array] ? $scope.allAnomalies[array].length : 0;
        }
        return sum;
    };

    $scope.getStreamObject = function(id) {
        return $scope.server.getStreamObject(id);
    };

    $scope.filterResponseData = function(data) {
        var anomaliesDesc = [];
        var allEventDesc = [];

        angular.forEach(data.data, function(i) {
            if (i.anomaly === "yes") {
                $scope.allAnomalies.anomalies.push(i);
            } else {
                $scope.allAnomalies.allEvents.push(i);
            };
        });

        angular.forEach($scope.allAnomalies.anomalies, function(i) {
            this.push(i.name);
        }, anomaliesDesc);

        angular.forEach($scope.allAnomalies.allEvents, function(i) {
            this.push(i.name);
        }, allEventDesc);

        $scope.uniqAnomaliesByEventType = _.uniqBy(anomaliesDesc);
        $scope.uniqAllEventsByEventType = _.uniqBy(allEventDesc);
        return data;
    };
    
    $scope.getAnomaliesByEventType = function(array, item) {
        var objectId = _.find($scope.allAnomalies[array], {name: item}).id;
        var startDate = new Date($scope.dateFilter.startdate).getDate();
        var endDate = new Date($scope.dateFilter.enddate).getDate();
        var streamId = $scope.selectedStream.id;

        if ($scope.dateFilter.startdate && $scope.dateFilter.enddate) {
            $scope.server
                .getStreamObjectIdByDate(streamId, objectId, startDate, endDate)
                .then($scope.selectEvents)
                .then($scope.goToPage)
                .then(null, $scope.getError);
        } else {
            $scope.server
                .getStreamObjectId(streamId, objectId)
                .then($scope.selectEvents)
                .then($scope.goToPage)
                .then(null, $scope.getError);
        };
    };

    $scope.selectEvents = function(data) {
        $scope.currentPage = 1;
        $scope.selectedEvents = data.data;
        return data;
    };

    $scope.getError = function(data) {
        console.log('ERROR!', data.statusText ? data.statusText : 'Something went wrong');
    };

    $scope.goToPage = function(data) {
        var startAt = ($scope.currentPage - 1) * $scope.itemPerPage;
        var endOn = startAt + $scope.itemPerPage;
        $scope.bigTotalItems = $scope.selectedEvents.length;
        $scope.renderedEvents = $scope.selectedEvents.slice(startAt, endOn);
        return data;
    };
    
}]);