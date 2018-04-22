/* global angular */

angular.module("SpanUnivStatsManagerApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v2/span-univ-stats";

    $scope.addStat = function() {
        $http.post(api,$scope.newStat).then(function seccessCallback(response){
            $scope.status = "ADDED CORRECTLY --> status: "+ response.status;
            delete $scope.newStat;
            getSpanUnivStats();
        },function errorCallback(response){
            console.log(response.status);
            if(response.status==400){
                $scope.status = " FAIL: It´s necesary to fill in all the fields --> status: "+ response.status;
            }
            if(response.status==409){
                $scope.status = " FAIL: Stat already exist --> status: "+ response.status;
            }
            delete $scope.newStat;
            getSpanUnivStats();
        });
        

    };


    $scope.deleteStat = function(autCommunity, year) {
        console.log("Stat to be deleted: Stat of " + autCommunity + " in " + year);
        $http.delete(api + "/" + autCommunity + "/" + year).then(function(response) {
            $scope.status = "DELETE method status :  Correctly deleted (" + response.status + ")";
            getSpanUnivStats();
        });
    };

    $scope.deleteAllStats = function() {
        $http.delete(api).then(function(response) {
            $scope.status = "DELETE method status :  Correctly deleted (" + response.status + ")";
            getSpanUnivStats();
        });
    };


    function getSpanUnivStats() {
        $http.get(api).then(function(response) {
            $scope.stats = response.data;
        });
    }

    getSpanUnivStats();

}]);
