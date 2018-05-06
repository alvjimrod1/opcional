/* global angular */

angular
    .module("AppManager", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/",{
                templateUrl:"AppMenu.html"
            })
            .when("/spanUnivStats", {
                templateUrl: "spanUnivStatsList.html",
                controller: "spanUnivStatsListCtrl"
            })
            .when("/stat/:autCommunity/:year", {
                templateUrl: "spanUnivStatsEdit.html",
                controller: "spanUnivStatsEditCtrl"
            })
            .when("/spanUnivStatsGraphs", {
                templateUrl: "spanUnivStatsGraphs.html",
                controller: "spanUnivStatsGraphsCtrl"
            });

    });
