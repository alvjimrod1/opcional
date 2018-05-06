 /* global angular */
 /* global $ */
 angular.module("AppManager").controller("spanishUniversitiesListCtrl", ["$scope", "$http", function($scope, $http) {
  console.log("List Ctrl initialited");
  var api = "/api/v2/spanish-universities";
  var search = "?";
  var limit = 10;
  var offset = 0;
  var paginationString = "";
  $scope.currentPage = 1;

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
   delete $scope.newUniv;
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
   paginationString = "&limit=" + limit + "&offset=" + offset;
   $http.get(api + search + paginationString).then(function(response) {
    $scope.univs = response.data;
   });
   search = "?";
  };


  $scope.searchUniversity1 = function() {

   $('#search').modal('show');
   getSpanishUniversities();
   delete $scope.searchForm;
  };


  $scope.searchUniversity2 = function() {
   $('#search').modal('show');
   //getSpanishUniversities();

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
    search += ("&nameUniversity=" + $scope.searchForm.nameUniversity);
   }
   if ($scope.searchForm.from) {
    search += ("&from=" + $scope.searchForm.from);
   }
   if ($scope.searchForm.to) {
    search += ("&to=" + $scope.searchForm.to);
   }

   getSpanishUniversities();
  };


  $scope.previousPage = function() {
   if ($scope.currentPage > 1) {
    offset -= limit;
    getSpanishUniversities();
    $scope.currentPage -= 1;
   }
  };

  $scope.nextPage = function() {
   if ($scope.univs.length == 10) {
    offset += limit;
    getSpanishUniversities();
    $scope.currentPage += 1;
   }
  };



  getSpanishUniversities();


 }]);
 