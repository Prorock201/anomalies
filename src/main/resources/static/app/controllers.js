'use strict';

app.controller('AppController', ['$scope', 'Stream', function($scope,Stream) {

    $scope.streams = [];
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
    }

}]);


