 /* global angular */
 /* global $ */
 angular.module("spanishUniversitiesManagerApp").controller("ListCtrl", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");
  var api = "/api/v2/spanish-universities";
  var search = "?";

  $scope.addUniv = function() {
   $http.post(api, $scope.newUniv).then(function successCallback(response) {
    $('#added').modal('show');
    getSpanishUniversities();
   }, function errorCallback(response) {
    console.log(response.status);
    if (response.status == 400) {
     $('#fail_400').modal('show');
    }
    if (response.status == 409) {
     $('#fail_409').modal('show');
    }
   });
   getSpanishUniversities();

  };

  $scope.deleteUniv = function(autCommunity, yearFund) {
   console.log("Spanish university to be deleted: " + autCommunity + "-" + yearFund);
   $http.delete(api + "/" + autCommunity + "/" + yearFund).then(function(response) {
    $('#deleted').modal('show');
    getSpanishUniversities();
   });
  };

  $scope.deleteAllUnivs = function() {
   $('#deleteAll').modal('show');
   var $btn = $('#yes');
   $btn.on("click", function() {
    $http.delete(api);
    getSpanishUniversities();

   });

   getSpanishUniversities();

  };
  $scope.deleteAllUnivs2 = function() {
   $('#confirm').modal('show');
   getSpanishUniversities();

  };



  $scope.loadInitialData = function() {
   $http.get(api + "/loadInitialData").then(function(response) {
    $('#addedAll').modal('show');
    getSpanishUniversities();
   });
  };

  function getSpanishUniversities() {
   $http.get(api + search).then(function(response) {
    $scope.univs = response.data;
   });
   search = "?";
  }


  $scope.searchUniversity1 = function() {

   $('#search').modal('show');
   getSpanishUniversities();

  };

  $scope.searchUniversity2 = function() {
   $('#search').modal('show');
   getSpanishUniversities();
   if ($scope.searchForm.autCommunity) {
    search += ("&autCommunity=" + $scope.searchForm.autCommunity);
   }
   if ($scope.searchForm.yearFund) {
    search += ("&yearFund=" + $scope.searchForm.yearFund);
   }
   if ($scope.searchForm.headquar) {
    search += ("&headquar=" + $scope.searchForm.headquar);
   }
   if ($scope.searchForm.type) {
    search += ("&type=" + $scope.searchForm.type);
   }
   if ($scope.searchForm.nameUniversity) {
    search += ("&nameUniversityr=" + $scope.searchForm.nameUniversity);
   }
   if ($scope.searchForm.from) {
    search += ("&from=" + $scope.searchForm.from);
   }
   if ($scope.searchForm.to) {
    search += ("&to=" + $scope.searchForm.to);
   }

   getSpanishUniversities();
  };
  getSpanishUniversities();


 }]);
 