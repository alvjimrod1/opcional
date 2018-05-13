/* global angular */
/* global Highcharts */
/* global google */
/* global Chartist */

angular.module("AppManager").controller("GraphApi1Ctrl", ["$scope", "$http", "$routeParams",
    function ($scope, $http, $routeParams) {
        var api = "/api/v2/open-source-contests";

        console.log("graph API 1 Ctrl initialized!");

        $http.get(api).then((response) => {

            let hc_aux = {};

            response.data.forEach(e => {
                if (!(e.city.toLowerCase() in hc_aux)) {
                    hc_aux[e.city.toLowerCase()] = [1, 0, 0];
                } else {
                    hc_aux[e.city.toLowerCase()][0]++;
                }
            });

            console.log(hc_aux)
            let api1 = 'https://sos1718-04.herokuapp.com/api/v1/medical-attention-rates/'

            $http.get(api1).then((response1) => {
                response1.data.forEach(e => {
                    if (!(e.province.toLowerCase() in hc_aux)) {
                        hc_aux[e.province.toLowerCase()] = [0, e["general-medicine"], 1];
                    } else {
                        hc_aux[e.province.toLowerCase()][1] += e["general-medicine"];
                        hc_aux[e.province.toLowerCase()][2]++;
                    }
                });
                console.log(hc_aux)

                hc_out = []

                for (var i in hc_aux) {
                        hc_out.push([i, hc_aux[i][0], isNaN(parseInt((hc_aux[i][1] / hc_aux[i][2]).toFixed(2))) ? 0.5 : parseInt((hc_aux[i][1] / hc_aux[i][2]).toFixed(2))]);
                }

                Highcharts.chart('container', {

                    chart: {
                        type: 'variwide'
                    },

                    title: {
                        text: 'Medicina general y participantes del CUSL'
                    },

                    subtitle: {
                        text: 'open-source-contests + medical-attention-rates'
                    },

                    xAxis: {
                        type: 'category',
                        title: {
                            text: 'Column widths are proportional to GDP'
                        }
                    },

                    legend: {
                        enabled: false
                    },

                    series: [{
                        name: 'Labor Costs',
                        data: [...hc_out],
                        dataLabels: {
                            enabled: true,
                            format: 'Participantes {point.y:.0f}'
                        },
                        tooltip: {
                            pointFormat: 'Participantes: <b>€ {point.y}</b><br>' +
                                'Medicina general: <b> {point.z}</b><br>'
                        },
                        colorByPoint: true
                    }]

                });
            });




        });
    }]);