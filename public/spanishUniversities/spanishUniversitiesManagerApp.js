 /* global angular */
 angular.module("spanishUniversitiesManagerApp", ["ngRoute"])
  .config(function($routeProvider) {
   $routeProvider
    .when("/", {
     templateUrl: "list.html",
     controller: "ListCtrl"
    })
    .when("/contact/:name", {
     templateUrl: "edit.html",
     controller: "editCtrl"
    });
  });
 