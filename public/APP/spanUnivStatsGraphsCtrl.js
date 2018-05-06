/* global angular */
/* global $ */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("spanUnivStatsGraphsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api = "/api/v2/span-univ-stats";


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

    $http.get(api).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            years.push(response.data[i].year);

        }

        var totalEnrolledNumber = [];
        var totalMaster = [];

        for (var i = 0; i < years.sortNumbers().unique().length; i++) {
            var yearEnrolledNumber = 0;
            var yearMaster = 0;
            for (var j = 0; j < response.data.length; j++) {
                if (response.data[j].year == years.sortNumbers().unique()[i]) {
                    yearEnrolledNumber += response.data[j].enrolledNumber;
                    yearMaster += response.data[j].master;
                }
            }

            totalEnrolledNumber.push(yearEnrolledNumber);
            totalMaster.push(yearMaster);

        }

        for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].year == years[years.length - 1]) {
                googleChartData.push([response.data[i].autCommunity, response.data[i].enrolledNumber])
            }
        }




        /*HIGHCHARTS*/

        Highcharts.chart('highcharts', {

            chart: {
                type: 'line'
            },

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


        //var cadenaPrueba=[["Region","EnrolledNumber"],["murcia",200],["cataluña",200]]



        /*GOOGLE CHARTS*/

        google.charts.load('current', {
            'packages': ['geochart'],
            // Note: you will need to get a mapsApiKey for your project.
            // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
            'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
        });
        google.charts.setOnLoadCallback(drawRegionsMap);

        function drawRegionsMap() {
            var data = google.visualization.arrayToDataTable(googleChartData);

            var options = {
                region: 'ES',
                displayMode: 'markers',
                colorAxis: { colors: ['green', 'blue'] }
            };

            var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

            chart.draw(data, options);
        }



        /*CHARTIST*/

        var chartistSeries = [];
        chartistSeries.push(totalMaster);

        new Chartist.Line('#chart1', {
            labels: years.unique().sortNumbers(),
            series: chartistSeries
        });



    });
}]);
