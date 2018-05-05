/* global angular */
/* global $ */
/* global Highcharts */

angular.module("SpanUnivStatsManagerApp").controller("GraphsCtrl", ["$scope", "$http","$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api = "/api/v2/span-univ-stats";
    
    
    $scope.return = function(){
        $location.path("/");
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




}]);
