/* global angular */

angular.module("spanishUniversitiesManagerApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Ctrl initialized!");
            var univUrl = "/api/v2/spanish-universities/" + $routeParams.autCommunity + "/" + $routeParams.yearFund;

            $http.get(univUrl).then(function successCallback(response) {
                $scope.updatedUniv = response.data;
            }, function errorCallback(response) {
                $scope.status = "FAIL of charge" + response.status;
            });;

            $scope.updateUniv = function() {
                $http.put(univUrl, $scope.updatedUniv).then(function successCallback(response) {
                    $scope.status = "UPDATE method status :  Correctly updated (" + response.status + ")";
                    console.log("Todo OK");
                    $location.path("/");

                }, function errorCallback(response) {
                    console.log("ERRRRRRRRRRRROR");
                    $scope.status = "ERROR updated (" + response.status + ")";

                });
            }





        }
    ]);
