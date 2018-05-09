/* global angular */
/* global $ */
angular.module("AppManager")
    .controller("spanishUniversitiesEditCtrl", ["$scope", "$http", "$routeParams", "$location",
        function($scope, $http, $routeParams, $location) {
            console.log("Edit Ctrl initialized!");
            var univUrl = "/api/v2/spanish-universities/" + $routeParams.autCommunity + "/" + $routeParams.yearFund;



            $http.get(univUrl).then(function(response) {
                $scope.updatedUniv = response.data;
           
 });
            $scope.updateUniv = function() {
                if (Object.values($scope.updatedUniv).includes("")) {
                    $('#missField').modal('show');
                }
                else {
                    $http.put(univUrl, $scope.updatedUniv).then(function(response) {
                        $('#changed').modal('show');
                        //$location.path("/");
                    });
                }
               
            };
           


        }
    ]);
