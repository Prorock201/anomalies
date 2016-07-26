'use strict';

app.controller('AppController', ['$scope', 'Stream', 'UpdateStream', 'GetById', '$http', function($scope,Stream, UpdateStream, GetById, $http) {

    $scope.streams = [];
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
        $scope.showAnomaliesEvents = false;
        $scope.showAllEvents = false;
    });

    $scope.signin = function() {
        $http({
            url: localUrl + '/eyecatcher/login',
            method: "POST",
            data: {username: $scope.username, password: $scope.password},
        })
        .then($scope.sendStreamsRequest)
        .then($scope.getStreams)
        .then(null, $scope.getError);
    };

    $scope.sendStreamsRequest = function(data) {
        $scope.user = data.data;
        return $http({
            url: localUrl + '/eyecatcher/streams',
            method: "GET",
            params: {userid: $scope.user.id},
        })
    };

    $scope.getStreams = function(data) {
        $scope.streams = data.data ? data.data : [];
        return data;
    };

    $scope.selectStream = function (stream) {
        $scope.selectedStream = stream;
        $scope.selectedEvents = stream.init;
        $scope.getStreamObject(stream.id)
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
        return $http({
            url: localUrl + '/eyecatcher/getStreamObjectSummaryByStreamId',
            method: "GET",
            params: {streamid: id}
        });
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
        $scope.currentPage = 1;
        var objectId = _.find($scope.allAnomalies[array], {name: item}).id;
        var startDate = new Date($scope.dateFilter.startdate).getDate();
        var endDate = new Date($scope.dateFilter.enddate).getDate();

        if ($scope.dateFilter.startdate && $scope.dateFilter.enddate) {
            $http({
                url: localUrl + '/eyecatcher/getStreamObjectSummaryByStreamidAndObjectIdByDate',
                method: "GET",
                params: {streamid:  $scope.selectedStream.id, objectid: objectId, from: startDate, to: endDate}
            })
            .then($scope.selectEvents)
            .then($scope.goToPage)
            .then(null, $scope.getError);
        } else {
            $http({
                url: localUrl + '/eyecatcher/getStreamObjectSummaryByStreamIdAndObjectId',
                method: "GET",
                params: {streamid:  $scope.selectedStream.id, objectid: objectId}
            })
            .then($scope.selectEvents)
            .then($scope.goToPage)
            .then(null, $scope.getError);
        };
    };

    $scope.selectEvents = function(data) {
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

app.controller('ObjectsController', ['$scope', 'Objects' ,'$http', function($scope, Objects, $http) {

    $scope.selected = [];
    $scope.objects = [];

    Objects.query(function(response) {
        $scope.objects = response ? response : [];
    });

    $scope.updateSelection = function($event, id) {

        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        var active = 1;
        if (action == 'remove') active = 0;

        $http({
            url: 'http://api.leadspotting.com/LSAPI/LeadSpottingApi.jsp',
            method: "POST",
            params: {Command: 'updateStreamObject', Objectid: id, Active: active}
        }).then(function (response) {
                console.log("sucess")
                console.log(response)
            },
            function (response) {
                console.log("failed")
            });

    };

}]);