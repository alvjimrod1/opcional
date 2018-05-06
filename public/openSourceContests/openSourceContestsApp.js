/* global angular */

angular
    .module("openSourceContestsApp", ["ngRoute"])
    .config(function ($routeProvider) {
        $routeProvider.when("/", {
            templateUrl: "list/list.html",
            controller: "ListCtrl"
        }).when("/contest/:year/:university/:project", {
            templateUrl: "edit/edit.html",
            controller: "EditCtrl"
        }).when("/graph", {
            templateUrl: "graph/graph.html",
            controller: "GraphCtrl"
        });
    });
