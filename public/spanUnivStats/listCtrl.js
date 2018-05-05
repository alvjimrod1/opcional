/* global angular */
/* global $ */
/* global Highcharts */


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
            //$scope.status = "ADDED CORRECTLY --> status: " + response.status;
            $('#addedCorrectly').modal('show');
            delete $scope.newStat;
            getSpanUnivStats();
        }, function errorCallback(response) {
            console.log(response.status);
            if (response.status == 400) {
                //$scope.status = " FAIL: It´s necesary to fill in all the fields";
                $('#unexpectedFields').modal('show');
            }
            if (response.status == 409) {
                //$scope.status = " FAIL: Stat already exist";
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
        getHighchart();
    };

    getSpanUnivStats();
    getHighchart();



    $scope.searchStat = function() {

        $('#search').modal('show');

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

    $scope.loadInitialStats = function() {
        $http.get(api + "/loadInitialData").then(function(response) {
            $('#loadInitial').modal('show');
            getSpanUnivStats();
        });

    }

    $scope.openSearchModal = function() {
        $('#search').modal('show');
        getSpanUnivStats();
        delete $scope.searchedStat;
    }
    
    
    
      /* CHARTS */

    /* eliminar elementos duplicados*/

    Array.prototype.unique = function(a) {
        return function() { return this.filter(a) }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });

    /*ordenar array*/

    Array.prototype.sortNumbers = function() {
        return this.sort(
            function(a, b) {
                return a - b
            }
        );
    }

function getHighchart(){

    var enr = [];
    var years = [];

    $http.get(api).then(function(response) {
        console.log(response.data[0].enrolledNumber);
        for (var i = 0; i < response.data.length; i++) {
            years.push(response.data[i].year);

        }
        
        var totalEnrolledNumber = [];

        for (var i = 0; i < years.sortNumbers().unique().length; i++) {
            var yearEnrolledNumber = 0;
            for (var j = 0; j < response.data.length; j++) {
                if (response.data[j].year == years.sortNumbers().unique()[i]) {
                    yearEnrolledNumber += response.data[j].enrolledNumber;
                }
            }
            totalEnrolledNumber.push(yearEnrolledNumber);

        }

        Highcharts.chart('highcharts', {

            title: {
                text: 'Spanish Universities Statistics'
            },

            yAxis: {
                title: {
                    text: 'Enrolled Number'
                }
            },
            xAxis: {
                categories: years.sortNumbers().unique()
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle'
            },

            plotOptions: {
                series: {
                    label: {
                        connectorAllowed: true
                    }
                }
            },

            series: [{
                name: 'Enrolled',
                data: totalEnrolledNumber
            }],

            responsive: {
                rules: [{
                    condition: {
                        maxWidth: 500
                    },
                    chartOptions: {
                        legend: {
                            layout: 'horizontal',
                            align: 'center',
                            verticalAlign: 'bottom'
                        }
                    }
                }]
            }

        });
    });
};


}]);
