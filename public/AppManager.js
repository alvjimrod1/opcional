/* global angular */

angular
    .module("AppManager", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            /*BALTA */
            .when("/", {
                templateUrl: "AppMenu.html"
            }).when("/analytics", {
                templateUrl: "analytics.html"
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
            })
            .when("/crimeSpanUnivStats", {
                templateUrl: "crimeSpanUnivStatsGraph.html",
                controller: "crimeSpanUnivStatsGraphCtrl"

            })
            .when("/GPSpanUnivStats", {
                templateUrl: "GPSpanUnivStatsGraph.html",
                controller: "GPSpanUnivStatsGraphCtrl"



                /*ALVARO*/
            }).when("/spanishUniversities", {
                templateUrl: "../spanishUniversities/spanishUniversitiesList.html",
                controller: "spanishUniversitiesListCtrl"
            })
            .when("/univ/:autCommunity/:yearFund", {
                templateUrl: "../spanishUniversities/spanishUniversitiesEdit.html",
                controller: "spanishUniversitiesEditCtrl"
            })
            .when("/spanishUniversitiesGraphs", {
                templateUrl: "../spanishUniversities/spanishUniversitiesGraphs.html",
                controller: "spanishUniversitiesGraphsCtrl"

            })
            .when("/spanishUniversitiesCORS", {
                templateUrl: "../spanishUniversities/integraciones/spanishUniversitiesGraphsApiCors.html",
                controller: "spanishUniversitiesGraphsApiCorsCtrl"
            })
            .when("/spanishUniversitiesPROXY", {
                templateUrl: "../spanishUniversities/integraciones/spanishUniversitiesGraphsApiProxy.html",
                controller: "spanishUniversitiesGraphsApiProxyCtrl"
            })


            /*RAFA*/
            .when("/openSourceContests", {
                templateUrl: "../openSourceContests/list/list.html",
                controller: "ListCtrl"
            }).when("/contest/:year/:university/:project", {
                templateUrl: "../openSourceContests/edit/edit.html",
                controller: "EditCtrl"
            }).when("/openSourceContests/graph", {
                templateUrl: "../openSourceContests/graph/graph.html",
                controller: "GraphCtrl"
            }).when("/openSourceContests/graphApi1", {
                templateUrl: "../openSourceContests/graph/graphApi1.html",
                controller: "GraphApi1Ctrl"
            }).when("/openSourceContestsPROXY/", {
                templateUrl: "../openSourceContests/graph/graphApi2.html",
                controller: "GraphApi2Ctrl"
            });
    });
