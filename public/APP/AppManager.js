/* global angular */

angular
    .module("AppManager", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            /*BALTA */
            .when("/", {
                templateUrl: "AppMenu.html"
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

                /*ALVARO*/
            }).when("/spanishUniversities", {
                templateUrl: "spanishUniversitiesList.html",
                controller: "spanishUniversitiesListCtrl"
            })
            .when("/univ/:autCommunity/:yearFund", {
                templateUrl: "spanishUniversitiesEdit.html",
                controller: "spanishUniversitiesEditCtrl"
            })
            .when("/spanishUniversitiesGraphs", {
                templateUrl: "spanishUniversitiesGraphs.html",
                controller: "spanishUniversitiesGraphsCtrl"
            }).when("/openSourceContests", {
                templateUrl: "../openSourceContests/list/list.html",
                controller: "ListCtrl"
            }).when("/openSourceContests/contest/:year/:university/:project", {
                templateUrl: "../openSourceContests/edit/edit.html",
                controller: "EditCtrl"
            }).when("/openSourceContests/graph", {
                templateUrl: "../openSourceContests/graph/graph.html",
                controller: "GraphCtrl"
            });
    });
