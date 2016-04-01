(function(angular) {
    var AppController = function($scope, Stream) {

        $scope.streams = [];
       /* $scope.anomalies = [];
        $scope.anomalyLength = 0;*/


        Stream.query(function(response) {
            $scope.streams = response ? response : [];
            console.log(angular.fromJson(response));
          
           /* $scope.anomalies = streams.anomalies;
            $scope.anomalyLength = anomalies.length;*/
            /*window.localStorage.setItem("streams", JSON.stringify(response));*/
        });

    };

    AppController.$inject = ['$scope', 'Stream'];
    angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));