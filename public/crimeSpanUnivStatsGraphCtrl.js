/* global angular */
/* global $ */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("crimeSpanUnivStatsGraphCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var apiSpanUnivStats = "/api/v2/span-univ-stats";
    var apiCrime = "https://sos1718-07.herokuapp.com/api/v1/global-terrorism-data";


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



    var enr = [];
    var years = [];
    var googleChartData = [
        ["Region", "EnrolledNumber"]
    ];
    var chartistData = [];




    $http.get(apiSpanUnivStats).then(function(responseSpanUnivStats) {
        for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
            years.push(responseSpanUnivStats.data[i].year);

        }

        var totalEnrolledNumber = [];
        var totalMaster = [];

        for (var i = 0; i < years.sortNumbers().unique().length; i++) {
            var yearEnrolledNumber = 0;
            var yearMaster = 0;
            for (var j = 0; j < responseSpanUnivStats.data.length; j++) {
                if (responseSpanUnivStats.data[j].year == years.sortNumbers().unique()[i]) {
                    yearEnrolledNumber += responseSpanUnivStats.data[j].enrolledNumber;
                    yearMaster += responseSpanUnivStats.data[j].master;
                }
            }

            totalEnrolledNumber.push(yearEnrolledNumber);
            totalMaster.push(yearMaster);

        }

        for (var i = 0; i < responseSpanUnivStats.data.length; i++) {
            if (responseSpanUnivStats.data[i].year == years[years.length - 1]) {
                googleChartData.push([responseSpanUnivStats.data[i].autCommunity, responseSpanUnivStats.data[i].enrolledNumber])
            }
        }



        $http.get(apiCrime).then(function(responseCrime) {
            console.log(responseCrime.data);



            /*HIGHCHARTS*/

            Highcharts.chart('crimeSpanUnivStats', {
                chart: {
                    type: 'area'
                },
                title: {
                    text: 'FootballStatsApi and SpanUnivStatsApi Integration'
                },
                xAxis: {
                    allowDecimals: false,
                    labels: {
                        formatter: function() {
                            return this.value; // clean, unformatted number for year
                        }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Enrolled and Kills number'
                    },
                },
                tooltip: {
                    pointFormat: '{series.name} had stockpiled <b>{point.y:,.0f}</b><br/>warheads in {point.x}'
                },
                plotOptions: {
                    area: {
                        marker: {
                            enabled: false,
                            symbol: 'circle',
                            radius: 2,
                            states: {
                                hover: {
                                    enabled: true
                                }
                            }
                        }
                    }
                },
                series: [{
                    name: 'USA',
                    data: [
                        null, null, null, null, null, 6, 11, 32, 110, 235,
                        369, 640, 1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468,
                        20434, 24126, 27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342,
                        26662, 26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                        24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586, 22380,
                        21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950, 10871, 10824,
                        10577, 10527, 10475, 10421, 10358, 10295, 10104, 9914, 9620, 9326,
                        5113, 5113, 4954, 4804, 4761, 4717, 4368, 4018
                    ]
                }, {
                    name: 'USSR/Russia',
                    data: [null, null, null, null, null, null, null, null, null, null,
                        5, 25, 50, 120, 150, 200, 426, 660, 869, 1060,
                        1605, 2471, 3322, 4238, 5221, 6129, 7089, 8339, 9399, 10538,
                        11643, 13092, 14478, 15915, 17385, 19055, 21205, 23044, 25393, 27935,
                        30062, 32049, 33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000,
                        37000, 35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                        21000, 20000, 19000, 18000, 18000, 17000, 16000, 15537, 14162, 12787,
                        12600, 11400, 5500, 4512, 4502, 4502, 4500, 4500
                    ]
                }]
            });

        });

    });
}]);
