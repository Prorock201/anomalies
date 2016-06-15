'use strict';

app.controller('AppController', ['$scope', 'Stream' , function($scope,Stream) {

    $scope.streams = [];
    $scope.objects = [];
    $scope.selectedStream = {};
    $scope.image = '';
    $scope.filterDate = 'date';

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

    $scope.changeFilter = function() {
        $scope.filterDate = ($scope.filterDate == 'date') ? '-date' : 'date';
    };

    $scope.isFilterUp = function() {
        return $scope.filterDate == 'date'? false : true;
    };

}]);

app.controller('ObjectsController', ['$scope', 'Objects' , function($scope, Objects, $http) {


    $scope.selected = [];
    $scope.objects = [];

    Objects.query(function(response) {
        $scope.objects = response ? response : [];
    });

    $scope.updateSelection = function($event, id) {

        var checkbox = $event.target;
        var action = (checkbox.checked ? 'add' : 'remove');
        if (action == 'add' & selected.indexOf(id) == -1) selected.push(id);
        if (action == 'remove' && selected.indexOf(id) != -1) selected.splice(selected.indexOf(id), 1);

            var params = {
                objectId: 1,
                operation: true,
            };

        $http({
            url: 'http://localhost:8080/eyecatcher/updateObjects',
            method: "POST",
            data: { 'message' : params }
        })
            .then(function(response) {
                    // success
                },
                function(response) { // optional
                    // failed
                });
        
        

    };



}]);


