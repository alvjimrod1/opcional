 /* global angular */
 angular.module("spanishUniversitiesManagerApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");
  var api = "/api/v1/spanish-universities";


  $scope.addUniv = function() {
   $http.post(api, $scope.newUniv).then(function(response) {
    $scope.status = "Status : " + response.status;
    // console.log(JSON.stringify(response, null, 2))
    getSpanishUniversities();
   });
  }



  $scope.deleteUniv = function(autCommunity, yearFund) {
   console.log("Spanish university to be deleted: " + autCommunity + "-" + yearFund)
   $http.delete(api + "/" + autCommunity + "/" + yearFund).then(function(response) {
    $scope.status = "Status : " + response.status;
    //console.log(JSON.stringify(response, null, 2))
    getSpanishUniversities();
   });
  }

  $scope.deleteAllUnivs = function() {
   $http.delete(api).then(function(response) {
    $scope.status = "Delete all universities :  Correctly deleted (" + response.status + ")";
    getSpanishUniversities();
   });
  }



  function getSpanishUniversities() {
   $http.get(api).then(function(response) {
    $scope.univs = response.data;
   });
  }

  getSpanishUniversities();



 }]);
 