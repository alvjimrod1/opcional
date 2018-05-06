/* global angular */
/* global $ */
/* global Highcharts */
/* global google */

angular.module("spanishUniversitiesManagerApp").controller("graphsCtrl", ["$scope", "$http", "$location", function($scope, $http, $location) {
    console.log("Graph Controller Initialized!");
    var api = "/api/v2/spanish-universities";
    /* HIGCHARTS */

    Array.prototype.unique = function(a) {
        return function() {
            return this.filter(a)
        }
    }(function(a, b, c) {
        return c.indexOf(a, b + 1) < 0;
    });


    var autCommunities = [];
  //  var hq = [];
    var googleChartData = [
        ["Aut Community", "Number of universities"]
    ];




    $http.get(api).then(function(response) {
        // console.log(response.data);
        for (var i = 0; i < response.data.length; i++) {
            autCommunities.push(response.data[i].autCommunity);
         //   hq.push(response.data[i].headquar);

        }
        console.log("AUTCOMUNITIES" + autCommunities)

        var totalPublicas = [];
        var totalPrivadas = [];

        for (var i = 0; i < autCommunities.unique().length; i++) {
            var acumPublicas = 0;
            var acumPrivadas = 0;
            for (var j = 0; j < response.data.length; j++) {
                if ((response.data[j].autCommunity) == autCommunities.sort().unique()[i]) {
                    if (response.data[j].type == "publica")

                        acumPublicas += 1;
                }

                if ((response.data[j].autCommunity) == autCommunities.sort().unique()[i]) {
                    if (response.data[j].type == "privada")
                        acumPrivadas += 1;
                }
            }

            totalPublicas.push(acumPublicas);
            totalPrivadas.push(acumPrivadas);

        }

        var totalPublicUniversities = 0;
        for (var i = 0; i < totalPublicas.length; i++) {
            totalPublicUniversities += totalPublicas[i];
        }

        console.log(totalPublicUniversities)

        var totalPrivateUniversities = 0;
        for (var i = 0; i < totalPrivadas.length; i++) {
            totalPrivateUniversities += totalPrivadas[i];
        }
        console.log(totalPrivateUniversities)

        //////GOOGLE CHARTS/////

        for (var i = 0; i < response.data.length; i++) {
            var cont = 0;
            for (var j = 0; j < response.data.length; j++) {
                if (response.data[j].autCommunity == response.data[i].autCommunity) {
                    cont++;
                }
            }
            googleChartData.push([response.data[i].autCommunity, cont])
        }

        // console.log(cont)


        Highcharts.chart('container', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Number of Universities per type in autonomous communities'
            },
            xAxis: {
                categories: autCommunities.unique()
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
                data: totalPublicas //sacar las universidades publicas

            }, {
                name: 'Privadas',
                data: totalPrivadas //sacar las universidades privadas 
            }, ]
        });



    })

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
            resolution: 'provinces',


            colorAxis: {
                minValue: 0,
                maxValue: 10
            }
        };


        var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

        chart.draw(data, options);
    }

}]);
