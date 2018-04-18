/* global angular */

angular.module("SpanUnivStatsManagerApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/span-univ-stats";

    $scope.addStat = function() {
        $http.post(api, $scope.newStat).then(function(response) {
            /*
            if (response.status == 500) {
                $scope.status = "Error accesing database. Sorry, try it later (" + response.status + ")";

            }
            else if (response.status == 400) {
                $scope.status = "It is necesary to fill in all the fields (" + response.status + ")";

            }
            else if (response.status == 409) {
                $scope.status = "Conflict. There is already an autonomous community for that year (" + response.status + ")";

            }
            else if (response.status == 201) {
                $scope.status = "ADD method status :  Correctly created (" + response.status + ")";

            }}*/

            if (response.status == 201) {
                $scope.status = "ADD method status :  Correctly created (" + response.status + ")";
            }

            getSpanUnivStats();
        });
    }
    
    $scope.deleteStat = function(autCommunity,year) {
        console.log("Stat to be deleted: Stat of " + autCommunity +" in "+ year);
        $http.delete(api+"/"+autCommunity+"/"+year).then(function(response) {
            $scope.status = "DELETE method status :  Correctly deleted (" + response.status + ")";
            getSpanUnivStats();
        });
    }
    

    function getSpanUnivStats() {
        $http.get(api).then(function(response) {
            $scope.stats = response.data;
        });
    }

    getSpanUnivStats();

}]);
