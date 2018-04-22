/* global angular */

angular.module("spanishUniversitiesManagerApp")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams", "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Ctrl initialized!");
            var univUrl = "/api/v1/spanish-universities/" + $routeParams.autCommunity + "/" + $routeParams.yearFund;


            $http.get(univUrl).then(function(response) {
                $scope.updatedUniv = response.data;
            });;

            $scope.updateUniv = function() {
                $http.put(univUrl, $scope.updatedStat).then(function(response) {

                    $scope.status = "UPDATE method status :  Correctly updated (" + response.status + ")";
                    $location.path("/");

                });
            }





        }
    ]);
