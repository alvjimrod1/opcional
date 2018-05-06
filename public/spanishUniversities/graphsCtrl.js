/* global angular */
/* global $ */
/* global Highcharts */
/* global google */

angular.module("spanishUniversitiesManagerApp").controller("graphsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    /* CHARTS */
    var arrayDeTipos = [];
    var publicas = [];
    var privadas = [];
    var categoriesArray = [];

    Array.prototype.unique = function(a) {
        return function() { return this.filter(a) }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0
    });




    $http.get(api).then(function(response) {

        for (var i = 0; i < response.data.length; i++) {
            arrayDeTipos.push(response.data[i].type);
            categoriesArray.push(response.data[i].autCommunity);
        }
        console.log("PROBANDO NO REPETIDOS = " + categoriesArray.unique())

        console.log("PROBANDO CON REPETIDOS = " + categoriesArray);

        for (var i = 0; i < arrayDeTipos.length; i++) {
            console.log("TIPOS :" + arrayDeTipos[i]);
            if (arrayDeTipos[i] == "publica") {
                publicas.push(3);
            }
            else {
                publicas.push(0);
            }


            if (arrayDeTipos[i] == "privada") {
                privadas.push(1);
            }
            else {
                privadas.push(0);
            }

        }
        // console.log(contPublicas);
        console.log("Numero de privadas :   " + privadas);

        console.log("Numero de publicas :   " + publicas);


        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Number of Universities in Autcommunities per year'
            },
            xAxis: {
                categories: categoriesArray
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Quantity of universities'
                }
            },
            legend: {
                reversed: true
            },
            plotOptions: {
                series: {
                    stacking: 'normal'
                }
            },
            series: [{
                name: 'Publicas',
                //data: [5, 3, 4, 7, 2] //sacar las universidades publicas
                data: publicas

            }, {
                name: 'Privadas',
                data: privadas //sacar las universidades privadas 
            }, ]
        });



    })










    /*HIGHCHARTS*/

}]);
