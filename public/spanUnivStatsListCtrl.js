/* global angular */
/* global $ */
/* global Highcharts */
//initialize all modals
angular.module("AppManager").controller("spanUnivStatsListCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("List Ctrl initialized!");
    var api = "/api/v2/span-univ-stats";
    var search = "?";
    var limit = 10;
    var offset = 0;
    var paginationString = "";
    $scope.currentPage = 1;
  



    $scope.addStat = function() {
        $http.post(api, $scope.newStat).then(function seccessCallback(response) {
            $('#addedCorrectly').modal('show');
            delete $scope.newStat;
            getSpanUnivStats();
        }, function errorCallback(response) {
            console.log(response.status);
            if (response.status == 400) {
                $('#unexpectedFields').modal('show');
            }
            if (response.status == 409) {
                $('#statAlreadyExist').modal('show');
            }
            delete $scope.newStat;
            getSpanUnivStats();

        });


    };


    $scope.deleteStat = function(autCommunity, year) {
        console.log("Stat to be deleted: Stat of " + autCommunity + " in " + year);
        $http.delete(api + "/" + autCommunity + "/" + year).then(function(response) {
            $('#statDeleted').modal('show');
            //$scope.status = "DELETE method status :  Correctly deleted ";
            getSpanUnivStats();
        });
    };

    $scope.deleteAllStats = function() {
        $http.delete(api).then(function(response) {
            $('#confirmDelete').modal('show');
            // $scope.status = "DELETE method status :  Correctly deleted";
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

    $scope.getAll = function() {
        $http.get(api + search).then(function(response) {
            $scope.stats = response.data;
            console.log($scope.stats.length);
        });
        search = "?";

    };



    $scope.searchStat = function() {

        $('#search').modal('show');
        if ($scope.searchedStat == undefined) {
            $scope.searchedStat = new Object();
        }

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

        $scope.getAll();


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

    $scope.loadInitialStats = function() {
        if ($scope.stats.length == 0) {
            $http.get(api + "/loadInitialData").then(function(response) {
                $('#loadInitial').modal('show');
                getSpanUnivStats();

            });
        }
    };

    $scope.openSearchModal = function() {
        $('#search').modal('show');
        getSpanUnivStats();
        delete $scope.searchedStat;
    };

    $scope.getGraphs = function() {
        $location.path("/spanUnivStatsGraphs");
    };

}]);
