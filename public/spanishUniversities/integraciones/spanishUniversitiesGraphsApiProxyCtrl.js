/* global angular */
/* global Highcharts */


angular.module("AppManager").controller("spanishUniversitiesGraphsApiProxyCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    var api2 = "https://sos1718-03.herokuapp.com/api/v1/global-warmings";


    /* HIGCHARTS */

    /*aux functions*/
    Array.prototype.unique = function(a) {
        return function() {
            return this.filter(a);
        };
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0;
    });
    /*--------MI API-------*/
    var comunidades = [];
    var provincesAntonio = [];

    var total = [];

    $http.get(api).then(function(response) {
        for (var i = 0; i < response.data.length; i++) {
            comunidades.push(response.data[i].autCommunity);

        }
        // var totalPublicas = [];
        /*API MIA */
        var int = [];
        for (var i = 0; i < comunidades.unique().length; i++) {
            var cont = 0;

            for (var j = 0; j < response.data.length; j++) {
                if (response.data[j].autCommunity == comunidades.sort().unique()[i]) {
                    cont++;
                }
            }

            int.push(cont);
            total.push([comunidades.sort().unique()[i], cont]);
        }

        console.log(int);
        console.log(comunidades.unique());


        /*API ANTONIO SAUCEJO */
        $http.get(api2).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                provincesAntonio.push(response.data[i].name);
            }
            console.log("PROVINCES ANTONIO: " + provincesAntonio.sort().unique())

            var int = [];
            for (var i = 0; i < provincesAntonio.unique().length; i++) {
                var cont = 0;

                for (var j = 0; j < response.data.length; j++) {
                    if (response.data[j].name == provincesAntonio.sort().unique()[i]) {
                        cont = response.data[j].peakPower;
                    }
                }

                int.push(cont);
                total.push([provincesAntonio.sort().unique()[i], cont]);
            }

            console.log(int);
            console.log(provincesAntonio.unique());
            console.log("EOEOEOEO" + (total));

            // totalComProv.push(comunidades.unique().sort());
            // totalComProv.push(provincesAntonio.unique().sort());
            // console.log("IIIIIIIII==>    " + totalComProv)
            ///HIGHCHARTS 2 PROXY ///

            Highcharts.chart('container1', {
                chart: {
                    type: 'area',
                    spacingBottom: 30
                },
                title: {
                    text: 'Integracion numero universidades en com autonomas/ consumo de ciudades'
                },
                subtitle: {
                    text: '* Jane\'s banana consumption is unknown',
                    floating: true,
                    align: 'right',
                    verticalAlign: 'bottom',
                    y: 15
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
                    categories: comunidades.unique().concat(provincesAntonio.unique())
                },
                yAxis: {
                    title: {
                        text: 'Y-Axis'
                    },
                    labels: {
                        formatter: function() {
                            return this.value;
                        }
                    }
                },
                tooltip: {
                    formatter: function() {
                        return '<b>' + this.series.name + '</b><br/>' +
                            this.x + ': ' + this.y;
                    }
                },
                plotOptions: {
                    area: {
                        fillOpacity: 0.1
                    }
                },
                credits: {
                    enabled: false
                },
                series: [{
                    name: 'Nª univs/peakPower:',
                    data: total
                }, ]
            });


        });
    });

}]);
