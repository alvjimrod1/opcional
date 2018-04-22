 /* global angular */
 angular.module("spanishUniversitiesManagerApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");
  var api = "/api/v2/spanish-universities";


  $scope.addUniv = function() {
   $http.post(api, $scope.newUniv).then(function successCallback(response) {
    $scope.status = "Status : " + response.status + "( University added correctly)";
    getSpanishUniversities();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $scope.status = "Status : " + response.status + "( FAIL: University dont have expected fields)";
    }
    if (response.status == 409) {
     $scope.status = "Status : " + response.status + "( FAIL: University already exists!!!)";
    }
   });
   getSpanishUniversities();

  };

  $scope.deleteUniv = function(autCommunity, yearFund) {
   console.log("Spanish university to be deleted: " + autCommunity + "-" + yearFund);
   $http.delete(api + "/" + autCommunity + "/" + yearFund).then(function(response) {
    $scope.status = "Status : " + response.status + "( University deleted correctly)";
    //console.log(JSON.stringify(response, null, 2))
    getSpanishUniversities();
   });
  };

  $scope.deleteAllUnivs = function() {
   $http.delete(api).then(function successCallback(response) {
    $scope.status = "Status : " + response.status + "(All universities deleted correctly)";
    getSpanishUniversities();
   }, function errorCallback(response) {
    $scope.status = "Status : " + response.status + "(FAIL: you can not delte all universities)";
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
 