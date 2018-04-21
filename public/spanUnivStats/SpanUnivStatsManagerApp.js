/* global angular */

angular
    .module("SpanUnivStatsManagerApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListCtrl"
            }).when("/span-univ-stats/:autCommunity/:year", {
                templateUrl: "edit.html",
                controller: "EditCtrl"
            });

    });
