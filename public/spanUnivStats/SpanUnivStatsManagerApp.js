/* global angular */

angular
    .module("SpanUnivStatsManagerApp", ["ngRoute"])
    .config(function($routeProvider){
        $routeProvider
        .when("/",{
            templateUrl: "list.html",
            controller: "ListCtrl"
        });
        
    });
        