 /* global angular */
 angular.module("spanishUniversitiesManagerApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
     console.log("List Ctrl initialited");
     var api = "/api/v1/spanish-universities";


     $scope.addContact = function() {
         $http.post(api, $scope.newContact).then(function(response) {
             $scope.status = "Status : " + response.status;
             // console.log(JSON.stringify(response, null, 2))
             getContacts();
         });
     }



     $scope.deleteContact = function(name) {
         console.log("Contact to be deleted: " + name)
         $http.delete(api + "/" + name).then(function(response) {
             $scope.status = "Status : " + response.status;
             //console.log(JSON.stringify(response, null, 2))
             getContacts();
         });
     }




     function getContacts() {
         $http.get(api).then(function(response) {
             $scope.contacts = response.data;
         });
     }

     getContacts();



 }]);
 