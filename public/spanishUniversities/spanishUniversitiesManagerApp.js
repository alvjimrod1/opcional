/* global angular */
angular
    .module("spanishUniversitiesManagerApp", ["ngRoute"])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListCtrl"
            }).when("/univ/:autCommunity/:yearFund", {
                templateUrl: "edit.html",
                controller: "EditCtrl"
            });

    });
