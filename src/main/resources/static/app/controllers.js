'use strict';

app.controller('AppController', ['$scope', 'Stream', 'UpdateStream', '$http' , function($scope,Stream, UpdateStream, $http) {

    $scope.streams = [];
    $scope.selectedStream = {};
    $scope.image = '';
    $scope.filterDate = 'date';
    $scope.dateFilter = {};
    $scope.selectedEvents = [];

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

        if($scope.selectedStream.anomalies.length > 0){
            $scope.image = $scope.selectedStream.anomalies[0].img;
            $scope.anomaly = $scope.selectedStream.anomalies[0];
        } else {
            $scope.image = stream.image;
            $scope.anomaly = null;
        }
    };

    $scope.changeImage = function (anomaly) {
        $scope.image = anomaly.img;
        $scope.anomaly = anomaly;
    };

    $scope.changeFilter = function() {
        $scope.filterDate = ($scope.filterDate == 'date') ? '-date' : 'date';
    };

    $scope.isFilterUp = function() {
        return $scope.filterDate != 'date';
    };

    $scope.findEventType = function(item) {
        var sum = 0;
        $scope.selectedStream.anomalies.forEach(function(value) {
            if(value.desc == item) { sum++ };
        });
        return sum;
    };

    $scope.changeFilter = function(event) {
        $scope.selectedEvents = event;
    };

    $scope.getDataByDate = function() {
        if ($scope.dateFilter.startdate && $scope.dateFilter.enddate) {
            $http({
                url: 'http://192.168.2.75:8080/eyecatcher/updateByRange',
                method: "POST",
                params: {streamId:  $scope.selectedStream.id, from: $scope.dateFilter.startdate.getTime(), to: $scope.dateFilter.enddate.getTime()}
            }).then(function (response) {
                    $scope.selectedStream = response.data[0];
                    $scope.selectedEvents = response.data[0].anomalies;
                    console.log("sucess");
                },
                function (response) {
                    console.log("failed");
                });
        }
    };

    $(window).on('fancyboxClosed', function(){
        $scope.dateFilter.startdate = '';
        $scope.dateFilter.enddate = '';
    });

    // $scope.$watch('selectedDate', function() {
    //     $http({
    //         url: 'http://localhost:8080/eyecatcher/updateStream',
    //         method: "POST",
    //         data: $scope.selectedStream,
    //         params: {date: $scope.selectedDate.getTime()}
    //     }).then(function (response) {
    //             $scope.selectStream(response.data);
    //             console.log(response.data);
    //         },
    //         function (response) { // optional
    //             console.log("failed")
    //         });
    // });

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
            function (response) { // optional
                console.log("failed")
            });

    };

}]);

