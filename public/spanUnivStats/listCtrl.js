/* global angular */


angular.module("SpanUnivStatsManagerApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v2/span-univ-stats";
    var search = "?";
    var limit = 10;
    var offset = 0;
    var paginationString = "";
    $scope.currentPage = 1;



    $scope.addStat = function() {
        $http.post(api, $scope.newStat).then(function seccessCallback(response) {
            $scope.status = "ADDED CORRECTLY --> status: " + response.status;
            delete $scope.newStat;
            getSpanUnivStats();
        }, function errorCallback(response) {
            console.log(response.status);
            if (response.status == 400) {
                $scope.status = " FAIL: It´s necesary to fill in all the fields";
            }
            if (response.status == 409) {
                $scope.status = " FAIL: Stat already exist";
            }
            delete $scope.newStat;
            getSpanUnivStats();
        });


    };


    $scope.deleteStat = function(autCommunity, year) {
        console.log("Stat to be deleted: Stat of " + autCommunity + " in " + year);
        $http.delete(api + "/" + autCommunity + "/" + year).then(function(response) {
            $scope.status = "DELETE method status :  Correctly deleted ";
            getSpanUnivStats();
        });
    };

    $scope.deleteAllStats = function() {
        $http.delete(api).then(function(response) {
            $scope.status = "DELETE method status :  Correctly deleted";
            getSpanUnivStats();
        });
    };


    function getSpanUnivStats() {
        paginationString = "&limit=" + limit + "&offset=" + offset;
        $http.get(api + search + paginationString).then(function(response) {
            $scope.stats = response.data;
            console.log($scope.stats.length);
        });
        search = "?";
    };

    getSpanUnivStats();



    $scope.searchStat = function() {



        if ($scope.searchedStat.autCommunity) {
            search += ("&autCommunity=" + $scope.searchedStat.autCommunity);
        }
        if ($scope.searchedStat.year) {
            search += ("&year=" + $scope.searchedStat.year);
        }
        if ($scope.searchedStat.enrolledNumber) {
            search += ("&enrolledNumber=" + $scope.searchedStat.enrolledNumber);
        }
        if ($scope.searchedStat.degree) {
            search += ("&degree=" + $scope.searchedStat.degree);
        }
        if ($scope.searchedStat.master) {
            search += ("&master=" + $scope.searchedStat.master);
        }
        if ($scope.searchedStat.firstSecondCycle) {
            search += ("&firstSecondCycle=" + $scope.searchedStat.firstSecondCycle);
        }
        if ($scope.searchedStat.from) {
            search += ("&from=" + $scope.searchedStat.from);
        }
        if ($scope.searchedStat.to) {
            search += ("&to=" + $scope.searchedStat.to);
        }

        getSpanUnivStats();


    };

    $scope.nextPage = function() {
        if ($scope.stats.length == 10) {
            offset += limit;
            getSpanUnivStats();
            $scope.currentPage += 1;
        }
    };

    $scope.previousPage = function() {
        if ($scope.currentPage > 1) {
            offset -= limit;
            getSpanUnivStats();
            $scope.currentPage -= 1;
        }
    };

    $scope.findPage = function() {
        offset = $scope.currentPage * limit - 10;
        getSpanUnivStats();

    };


}]);
