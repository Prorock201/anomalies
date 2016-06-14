'use strict';

app.controller('AppController', ['$scope', 'Stream' , function($scope,Stream) {

    $scope.streams = [];
    $scope.objects = [];
    $scope.selectedStream = {};
    $scope.image = '';

    $scope.anomaly = null;

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


