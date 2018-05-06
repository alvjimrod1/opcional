/* global angular */


angular.module("AppManager")
    .controller("GraphCtrl", ["$scope", "$http", "$routeParams",
        function ($scope, $http, $routeParams) {
            var api = "/api/v2/open-source-contests";

            console.log("graph Ctrl initialized!");

            google.charts.load('current', {
                'packages': ['geochart'],
                // Note: you will need to get a mapsApiKey for your project.
                // See: https://developers.google.com/chart/interactive/docs/basic_load_libs#load-settings
                'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
            });
            google.charts.setOnLoadCallback(drawRegionsMap);

            var dataAux1 = {};
            var dataAux2 = [];

            $http.get(api).then((response) => {
                response.data.forEach(e => {
                    if (!(e.autCommunity in dataAux1)) {
                        dataAux1[e.autCommunity] = 1;
                    } else {
                        dataAux1[e.autCommunity]++;
                    }
                });

                dataAux2.push(['provinces', 'Estudiantes']);
                Object.entries(dataAux1).forEach(e => dataAux2.push(e));
            });

            function drawRegionsMap() {
                var data = google.visualization.arrayToDataTable(dataAux2);

                var options = {
                    region: 'ES',
                    resolution: 'provinces',
                    colorAxis: {
                        minValue: 0,
                        maxValue: 10
                    }
                };

                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                chart.draw(data, options);
            }

            //HighChart

            var hc_aux = {};
            var hc_aux2 = [];

            $http.get(api).then((response) => {
                response.data.forEach(e => {
                    if (!(e.autCommunity in hc_aux)) {
                        hc_aux[e.autCommunity] = [];
                        hc_aux[e.autCommunity].push([e.year, 1]);
                    } else {
                        let year_exist = false;
                        hc_aux[e.autCommunity].forEach(year => {
                            if (e.year === year[0]) {
                                year[1]++;
                                year_exist = true;
                            }
                        });
                        if (year_exist === false) {
                            hc_aux[e.autCommunity].push([e.year, 1]);
                        }
                    }
                });

                for (var obj in hc_aux) {
                    hc_aux2.push({
                        name: obj,
                        data: hc_aux[obj]
                    });

                }

                Highcharts.chart('container-hc', {
                    chart: {
                        type: 'spline'
                    },
                    title: {
                        text: 'CUSL por comunidades autónomas'
                    },
                    subtitle: {
                        text: 'Irregular time data in Highcharts JS'
                    },
                    xAxis: {
                        type: 'year',
                        dateTimeLabelFormats: { // don't display the dummy year
                            year: '%b'
                        },
                        title: {
                            text: 'Year'
                        },
                        min: 2014
                    },
                    yAxis: {
                        title: {
                            text: 'Number of projects'
                        },
                        min: 0
                    },
                    tooltip: {
                        headerFormat: '<b>{series.name}</b><br>',
                        pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
                    },

                    plotOptions: {
                        spline: {
                            marker: {
                                enabled: true
                            }
                        }
                    },

                    colors: ['#6CF', '#39F', '#06C', '#036', '#000'],


                    series: [...hc_aux2]
                });

                var str_output = "Year,Projects\n";
                var years = {};

                response.data.forEach(obj => {
                    years[obj.year] = 0;
                });

                response.data.forEach(obj => {
                    years[obj.year] = years[obj.year] + 1;
                });

                Object.keys(years).forEach(d => {
                    str_output = str_output + d + "," + years[d] + "\n";
                });

                g = new Dygraph(document.getElementById("graphdiv"), str_output, {});

            });



        }]);