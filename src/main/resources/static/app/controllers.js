'use strict';

app.controller('AppController', ['$scope', 'Stream', 'UpdateStream', '$http' , function($scope,Stream, UpdateStream, $http) {

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

    $scope.anomaly = null;

    $scope.$watch('dateFilter', function() {
      if (!$scope.dateFilter.startdate) return;
      if (!$scope.dateFilter.enddate || $scope.dateFilter.enddate <= $scope.dateFilter.startdate) {
        $scope.dateFilter.enddate = new Date($scope.dateFilter.startdate);
      } 
    }, true);

    Stream.query(function(response) {
        $scope.streams = response ? response : [];
    });

    $scope.selectStream = function (stream) {
        $scope.selectedStream = stream;
        $scope.selectedEvents = stream.init;

        $scope.getStreamObject(stream.id);

        // if($scope.selectedStream.anomalies.length > 0){
        //     $scope.image = $scope.selectedStream.anomalies[0].img;
        //     $scope.anomaly = $scope.selectedStream.anomalies[0];
        // } else {
        //     $scope.image = stream.image;
        //     $scope.anomaly = null;
        // }
    };

    $scope.toggleDropDown = function(event) {
        $scope[event] = !$scope[event];
    };

    // $scope.changeImage = function (anomaly) {
    //     $scope.image = anomaly.img;
    //     $scope.anomaly = anomaly;
    // };

    // $scope.isFilterUp = function() {
    //     return $scope.filterDate != 'date';
    // };

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

    // $scope.changeFilter = function(array, item) {
    //     $scope.selectedEvents = $scope.selectedStream[array].filter(function(value) {
    //         return item == value.desc;
    //     });
    // };

    $scope.getStreamObject = function(id) {
        $http({
            url: 'http://192.168.2.75:8080/eyecatcher/getStreamObjectSummaryByStreamId',
            method: "GET",
            params: {streamId: id}
        }).then($scope.filterResponseData,
            function (response) {
                console.log('getStreamObject', 'failed');
            });
    };

    $scope.getAnomaliesByEventType = function(array, item) {
        var objectId = _.find($scope.allAnomalies[array], {name: item}).id;

        if ($scope.dateFilter.startdate && $scope.dateFilter.enddate) {
            $http({
                url: 'http://192.168.2.75:8080/eyecatcher/getStreamObjectSummaryByStreamIdAndObjectIdByDate',
                method: "GET",
                params: {streamId:  $scope.selectedStream.id, objectId: objectId, from: new Date($scope.dateFilter.startdate).getDate(), to: new Date($scope.dateFilter.enddate).getDate()}
            }).then(function (response) {
                    $scope.selectedEvents = response.data;
                    console.log('getAnomaliesByEventTypeByStreamIdAndObjectIdByDate', 'sucess');
                },
                function (response) {
                    console.log('getAnomaliesByEventTypeByStreamIdAndObjectIdByDate', 'failed');
                });
        } else {
            $http({
                url: 'http://192.168.2.75:8080/eyecatcher/getStreamObjectSummaryByStreamIdAndObjectId',
                method: "GET",
                params: {streamId:  $scope.selectedStream.id, objectId: objectId}
            }).then(function (response) {
                    $scope.selectedEvents = response.data;
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

    // $scope.getDataByDate = function() {
    //     if ($scope.dateFilter.startdate && $scope.dateFilter.enddate) {
    //         $http({
    //             url: 'http://192.168.2.75:8080/eyecatcher/updateByRange',
    //             method: "POST",
    //             params: {streamId:  $scope.selectedStream.id, from: new Date($scope.dateFilter.startdate).getDate(), to: new Date($scope.dateFilter.enddate).getDate()}
    //         }).then(function (response) {
    //                 $scope.selectedStream = response.data[0];
    //                 $scope.selectedEvents = response.data[0].anomalies;
    //                 console.log("sucess");
    //             },
    //             function (response) {
    //                 console.log("failed");
    //             });
    //     }
    // };

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

