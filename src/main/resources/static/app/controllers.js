'use strict';

app.controller('AppController', ['$scope', 'Stream', 'UpdateStream', '$http' , function($scope,Stream, UpdateStream, $http) {

    $scope.streams = [];
    $scope.selectedStream = {};
    $scope.image = '';
    $scope.filterDate = 'date';
    $scope.dateFilter = {};

    $scope.anomaly = null;

    $scope.$watch('startdate', function() {
      if (!$scope.startdate) return;
      if ($scope.enddate <= $scope.startdate) $scope.enddate = new Date($scope.startdate);
      $scope.minEndDate = new Date($scope.startdate);
    });
    $scope.$watch('dateFilter', function() {
      if (!$scope.dateFilter.startdate) return;
      if ($scope.dateFilter.enddate <= $scope.dateFilter.startdate) $scope.dateFilter.enddate = new Date($scope.dateFilter.startdate);
      $scope.dateFilter.minEndDate = new Date($scope.dateFilter.startdate);
    }, true);

    Stream.query(function(response) {
        $scope.streams = response ? response : [];
    });
    $scope.selectStream = function (stream) {
        $scope.selectedStream = stream;

        if($scope.selectedStream.anomalies.length > 0){
            $scope.image = $scope.selectedStream.anomalies[0].img;
            $scope.anomaly = $scope.selectedStream.anomalies[0];
        } else {
            $scope.image = stream.image;
            $scope.anomaly = null;        }
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

