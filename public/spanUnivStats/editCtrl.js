/* global angular */

angular.module("SpanUnivStatsManagerApp").controller("EditCtrl", ["$scope", "$http", "$routeParams","$location", function($scope, $http, $routeParams,$location) {
    console.log("Edit Ctrl initialized!");
    var statURL = "/api/v2/span-univ-stats/" + $routeParams.autCommunity + "/" + $routeParams.year;
    
    
     $http.get(statURL).then(function(response) {
        $scope.updatedStat = response.data;
    });
    

    $scope.updateStat = function() {
        $http.put(statURL, $scope.updatedStat).then(function(response) {

            $scope.status = "UPDATE method status :  Correctly updated (" + response.status + ")";
            $location.path("/");

        });
    }


   


}]);
