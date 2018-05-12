/* global angular */
/* global Highcharts */


angular.module("AppManager").controller("spanishUniversitiesGraphsApiProxyCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph CORS Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    var api2 = "https://sos1718-08.herokuapp.com/api/v1/divorces-an/";


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
    var total = [];
    var comunidades = [];
    var provincesJurado = [];

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
        console.log(total);

        /*API JURADO */
        $http.get(api2).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                provincesJurado.push(response.data[i].province);
            }
            console.log("PROVINCES JURADO: " + provincesJurado.sort().unique())

            var int = [];
            for (var i = 0; i < provincesJurado.unique().length; i++) {
                var cont = 0;

                for (var j = 0; j < response.data.length; j++) {
                    if (response.data[j].province == provincesJurado.sort().unique()[i] && response.data[j].year == 2015) {
                        cont = response.data[j].nullity;
                    }
                }

                int.push(cont);
                total.push([provincesJurado.sort().unique()[i], cont]);
            }

            console.log(int);
            console.log(provincesJurado.unique());
            console.log(total);

            ///HIGHCHARTS 2///
            Highcharts.chart('container1', {
                chart: {
                    type: 'pie',
                    options3d: {
                        enabled: true,
                        alpha: 45,
                        beta: 0
                    }
                },
                title: {
                    text: null
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        depth: 50,
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}'
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    data: total
                }]
            });

        });
    });

}]);
