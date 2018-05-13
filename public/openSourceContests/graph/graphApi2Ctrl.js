/* global angular */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("GraphApi2Ctrl", ["$scope", "$http", "$routeParams",
    function ($scope, $http, $routeParams) {
        var api = "/api/v2/open-source-contests";
        var api2 = "/proxyRAR/api/v2/basketball-stats";

        console.log("graph API 1 Ctrl initialized!");

        $http.get(api).then((response) => {

            let cities = [];
            let points = [];
            let partitients = [];

            response.data.forEach(e => {
                if (!(e.city in cities))
                    cities.push(e.city);
            });

            console.log(cities)

            $http.get(api2).then((response1) => {

                response1.data.forEach(b => {
                    if (!(b.stadium in cities))
                        cities.push(b.stadium);
                });

                for (var i = 0; i < cities.length; i++){
                    points[i] = 0;
                    partitients[i] = 0;
                }


                response1.data.forEach(b => {
                    points[cities.indexOf(b.stadium)] += b.first + b.second + b.third + b.fourth
                });

                response.data.forEach(e => {
                    partitients[cities.indexOf(e.city)]++;
                });

                console.log(points)
                console.log(partitients)

                
                Highcharts.chart('container', {
                    chart: {
                        type: 'areaspline'
                    },
                    title: {
                        text: 'Puntos o participantes por ciudad'
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'left',
                        verticalAlign: 'top',
                        x: 150,
                        y: 100,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
                    },
                    xAxis: {
                        categories: [...cities],
                        plotBands: [{ // visualize the weekend
                            from: 4.5,
                            to: 6.5,
                            color: 'rgba(68, 170, 213, .2)'
                        }]
                    },
                    yAxis: {
                        title: {
                            text: 'Points/Partitients'
                        }
                    },
                    tooltip: {
                        shared: true,
                        valueSuffix: ' units'
                    },
                    credits: {
                        enabled: false
                    },
                    plotOptions: {
                        areaspline: {
                            fillOpacity: 0.3
                        }
                    },
                    series: [{
                        name: 'Open Source Contests',
                        data: [...partitients]
                    }, {
                        name: 'Basketball',
                        data: [...points]
                    }]
                });
            });




        });
    }]);