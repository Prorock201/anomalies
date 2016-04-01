(function(angular) {
    var AppController = function($scope, Stream) {

        $scope.streams = [];

        Stream.query(function(response) {
            $scope.streams = response ? response : [];
        });



    };


    AppController.$inject = ['$scope', 'Stream'];
    angular.module("myApp.controllers").controller("AppController", AppController);
}(angular));



