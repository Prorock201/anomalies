'use strict';

app.controller('AppController', ['$scope', 'Stream', 'UpdateStream', 'GetById', '$http', function($scope,Stream, UpdateStream, GetById, $http) {

    $scope.streams = [];
    $scope.selectedStream = {};
    $scope.image = '';
    $scope.filterDate = 'date';
    $scope.dateFilter = {};
    $scope.selectedEvents = [];
    $scope.uniqAnomaliesByEventType = [];
    $scope.uniqAllEventsByEventType = [];
    $scope.showAnomaliesEvents = false;
    $scope.showAllEvents = false;
    $scope.allAnomalies = {
        anomalies: [],
        allEvents: [],
    };

    $scope.baseUrl = 'http://api.leadspotting.com';
    $scope.localUrl = 'http://192.168.2.95:8080';
    $scope.user = {
        response: false,
        id: 0
    };

    $scope.anomaly = null;


    $scope.renderedEvents = [];
    $scope.itemPerPage = 1; //Maximum number of items per page.
    $scope.maxSize = 5; // Limit number for pagination size
    $scope.bigTotalItems = $scope.selectedEvents.length;
    // $scope.bigTotalItems = 175;
    $scope.bigCurrentPage = 1; // Current page number. First page is 1

    $scope.goToPage = function() {
        debugger;
        var startAt = $scope.bigCurrentPage * $scope.itemPerPage;
        var endOn = startAt + $scope.itemPerPage;
        var renderedEvents = $scope.selectedEvents.slice(startAt, endOn);
        console.log('end');
    };

    // $scope.totalItems = 64; 
    // $scope.currentPage = 4;

    // $scope.setPage = function (pageNo) {
    //     $scope.currentPage = pageNo;
    // };

    // $scope.pageChanged = function() {
    //    console.log('Page changed to: ' + $scope.currentPage);
    // };




    $scope.$watch('dateFilter', function() {
      if (!$scope.dateFilter.startdate) return;
      if (!$scope.dateFilter.enddate || $scope.dateFilter.enddate <= $scope.dateFilter.startdate) {
        $scope.dateFilter.enddate = new Date($scope.dateFilter.startdate);
      } 
    }, true);

    $scope.signin = function() {
        debugger;
        $http({
            url: localUrl + '/eyecatcher/login',
            method: "POST",
            data: {username: $scope.username, password: $scope.password},
        })
        .then($scope.sendStreamsRequest, $scope.getError);
    };

    $scope.sendStreamsRequest = function(data) {
        $scope.user = data.data;
        $http({
            url: localUrl + '/eyecatcher/streams',
            method: "GET",
            params: {userid: $scope.user.id},
        })
        .then($scope.getStreams, $scope.getError);
    };

    $scope.getStreams = function(data) {
        $scope.streams = data.data ? data.data : [];
    };

    $scope.getError = function(data) {
        debugger;
        console.log('ERROR!', data.statusText ? data.statusText : 'Something went wrong');
    };

    $scope.selectStream = function (stream) {
        $scope.selectedStream = stream;
        $scope.selectedEvents = stream.init;
        $scope.getStreamObject(stream.id);
    };

    $scope.toggleDropDown = function(event) {
        $scope[event] = !$scope[event];
    };

    $scope.findEventType = function(array, item) {
        var sum = 0;
        if (item) {
            $scope.allAnomalies[array].forEach(function(value) {
                if(value.name == item) { sum++ };
            });
        } else {
            sum = $scope.allAnomalies[array] ? $scope.allAnomalies[array].length : 0;
        }
        return sum;
    };

    $scope.getStreamObject = function(id) {
        $http({
            url: baseUrl + '/eyecatcher/getStreamObjectSummaryByStreamId',
            method: "GET",
            params: {streamId: id}
        })
        .then($scope.filterResponseData,
            function (response) {
                console.log('getStreamObject', 'failed');
            });
    };

    $scope.getAnomaliesByEventType = function(array, item) {
        var objectId = _.find($scope.allAnomalies[array], {name: item}).id;

        if ($scope.dateFilter.startdate && $scope.dateFilter.enddate) {
            $http({
                url: baseUrl + '/eyecatcher/getStreamObjectSummaryByStreamIdAndObjectIdByDate',
                method: "GET",
                params: {streamId:  $scope.selectedStream.id, objectId: objectId, from: new Date($scope.dateFilter.startdate).getDate(), to: new Date($scope.dateFilter.enddate).getDate()}
            }).then(function (response) {
                    $scope.selectedEvents = response.data;
                    $scope.goToPage();
                    console.log('getAnomaliesByEventTypeByStreamIdAndObjectIdByDate', 'sucess');
                },
                function (response) {
                    console.log('getAnomaliesByEventTypeByStreamIdAndObjectIdByDate', 'failed');
                });
        } else {
            $http({
                url: baseUrl + '/eyecatcher/getStreamObjectSummaryByStreamIdAndObjectId',
                method: "GET",
                params: {streamId:  $scope.selectedStream.id, objectId: objectId}
            }).then(function (response) {
                    $scope.selectedEvents = response.data;
                    $scope.goToPage();
                    console.log('getAnomaliesByEventTypeByStreamIdAndObjectId', 'sucess');
                },
                function (response) {
                    console.log('getAnomaliesByEventTypeByStreamIdAndObjectId', 'failed');
                });
        };
    };

    $scope.filterResponseData = function(response) {
        var anomaliesDesc = [];
        var allEventDesc = [];

        angular.forEach(response.data, function(i) {
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
        console.log('getStreamObject', 'sucess');
    };

    $(window).on('fancyboxClosed', function(){
        $scope.dateFilter.startdate = '';
        $scope.dateFilter.enddate = '';
        $scope.showAnomaliesEvents = false;
        $scope.showAllEvents = false;
    });

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
            params: {Command: 'updateStreamObject', ObjectId: id, Active: active}
        }).then(function (response) {
                console.log("sucess")
                console.log(response)
            },
            function (response) {
                console.log("failed")
            });

    };

}]);