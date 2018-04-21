/* global angular */
angular
 .module("SpanishUniversitiesManagerApp", ["ngRoute"])
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
