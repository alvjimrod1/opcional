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
            });

            $scope.updateUniv = function() {
                $http.put(univUrl, $scope.updatedUniv).then(function successCallback(response) {
                    console.log(response.status);
                    // $scope.status = "Status : " + response.status + "(Update correctly)";
                    // $scope.status = "Status : " + response.status + "(Update correctly!!!)";
                    window.alert("Actualizado con éxito!!!! ");
                    $location.path("/");

                }, function errorCallback(response) {
                    console.log(response.status);
                    $scope.status = "Status : " + response.status + "(FAIL: update error)";

                });
            };





        }
    ]);
