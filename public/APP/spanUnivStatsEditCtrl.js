/* global angular */
/* global $ */

angular.module("AppManager").controller("spanUnivStatsEditCtrl", ["$scope", "$http", "$routeParams", "$location", function($scope, $http, $routeParams, $location) {
    console.log("Edit Ctrl initialized!");
    var statURL = "/api/v2/span-univ-stats/" + $routeParams.autCommunity + "/" + $routeParams.year;


    $http.get(statURL).then(function(response) {
        $scope.updatedStat = response.data;
    });


    $scope.updateStat = function() {
        if (Object.values($scope.updatedStat).includes(null)) {
            //$scope.status = " FAIL: It´s necesary to fill in all the fields";
            $('#unexpectedFields').modal('show');

        }
        else {
            $http.put(statURL, $scope.updatedStat).then(function(response) {
                console.log(Object.values($scope.updatedStat))
                window.alert("edited correctly");
                $location.path("/spanUnivStats");

            });
        }
    };





}]);
