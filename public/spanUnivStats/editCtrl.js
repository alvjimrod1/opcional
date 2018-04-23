/* global angular */

angular.module("SpanUnivStatsManagerApp").controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Edit Ctrl initialized!");
    var statURL = "/api/v2/span-univ-stats/" + $routeParams.autCommunity + "/" + $routeParams.year;


    $http.get(statURL).then(function(response) {
        $scope.updatedStat = response.data;
    });


    $scope.updateStat = function() {
        if (Object.values($scope.updatedStat).includes(null)) {
            $scope.status = " FAIL: It´s necesary to fill in all the fields --> status: (400)";

        }
        else {
            $http.put(statURL, $scope.updatedStat).then(function(response) {
                console.log(Object.values($scope.updatedStat))
                $scope.status = "UPDATE method status :  Correctly updated (" + response.status + ")";
                window.alert("edited correctly");
                $location.path("/");

            });
        }
    };





}]);
