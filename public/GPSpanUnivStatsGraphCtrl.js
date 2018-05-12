/* global angular */
/* global $ */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("GPSpanUnivStatsGraphCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var apiSpanUnivStats = "/api/v2/span-univ-stats";
    var apiGP = "/proxyGP/api/v1/motogp-stats";


    $scope.return = function() {
        $location.path("/spanUnivStats");
    };


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




    var years = [];


    /* SPANISH UNIVERSITIES STATS*/
    $http.get(apiSpanUnivStats).then(function(responseSpanUnivStats) {

        var totalScore = [];
        var totalEnrolledNumber = [];

        for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
            years.push(responseSpanUnivStats.data[i].year);

        }


        /* GP STATS*/
        $http.get(apiGP).then(function(responseGP) {
            console.log(responseGP.data);

            for (var i = 0; i < responseGP.data.length; i++) {
                years.push(responseGP.data[i].year);

            }

            for (var i = 0; i < years.sortNumbers().unique().length; i++) {
                var yearEnrolledNumber = 0;
                var yearScore = 0;
                for (var j = 0; j < responseSpanUnivStats.data.length; j++) {
                    if (responseSpanUnivStats.data[j].year == years.sortNumbers().unique()[i]) {
                        yearEnrolledNumber += responseSpanUnivStats.data[j].enrolledNumber;

                    }
                }
                for (var j = 0; j < responseGP.data.length; j++) {
                    if (responseGP.data[j].year == years.sortNumbers().unique()[i]) {
                        yearScore += responseGP.data[j].score;
                    }
                }

                totalEnrolledNumber.push(yearEnrolledNumber);
                totalScore.push(yearScore);

            }


            /*HIGHCHARTS*/


            Highcharts.chart('gpSpanUnivStats', {

                chart: {
                    type: 'column'
                },
                title: {
                    text: 'GPStatsApi and SpanUnivStatsApi Integration'
                },
                xAxis: {
                    categories: years.sortNumbers().unique()

                },
                yAxis: {
                    allowDecimals: false,
                    title: {
                        text: 'Enrolled Number and Score'
                    }
                },
                series: [{
                    name: 'Enrolled Number',
                    data: totalEnrolledNumber

                }, {
                    name: 'Score',
                    data: totalScore
                }]
            });


        });

    });
}]);
