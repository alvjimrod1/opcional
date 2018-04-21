/* global angular */

angular.module("SpanUnivStatsManagerApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v1/span-univ-stats";

    $scope.addStat = function() {
        $http.post(api, $scope.newStat).then(function(response) {
            console.log("response.status = " + response.status);

            switch (response.status) {
                case 500:
                    $scope.status = "Error accesing database. Sorry, try it later (" + response.status + ")";
                case 400:
                    $scope.status = "It is necesary to fill in all the fields (" + response.status + ")";
                case 409:
                    $scope.status = "Conflict. There is already a stat for " + $scope.newStat.autCommunity + ", " + $scope.newStat.year + " (" + response.status + ")";
                case 201:
                    $scope.status = "ADD method status :  Correctly created (" + response.status + ")";

            }
            getSpanUnivStats();
        });
    }

    $scope.deleteStat = function(autCommunity, year) {
        console.log("Stat to be deleted: Stat of " + autCommunity + " in " + year);
        $http.delete(api + "/" + autCommunity + "/" + year).then(function(response) {
            $scope.status = "DELETE method status :  Correctly deleted (" + response.status + ")";
            getSpanUnivStats();
        });
    }

    $scope.deleteAllStats = function() {
        $http.delete(api).then(function(response) {
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
