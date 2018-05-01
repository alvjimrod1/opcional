/* global angular */

angular
    .module("openSourceContestsApp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "list/list.html",
            controller: "ListCtrl"
        });
    });
