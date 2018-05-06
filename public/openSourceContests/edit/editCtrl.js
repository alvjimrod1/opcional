/* global angular */

angular.module("AppManager")
    .controller("EditCtrl", ["$scope", "$http", "$routeParams",
        function ($scope, $http, $routeParams) {
            console.log("edit Ctrl initialized!");
            console.log($routeParams);
            var api = "/api/v2/open-source-contests";

            $scope.removeContest = (contest) => {
                $http.delete(api + "/" + contest.year + "/" + contest.university + "/" + contest.project).then((response) => {
                    $scope.status = response.status;
                    alert("Se han eliminado el proyecto: " + contest.project);
                    getContest();
                });
            };

            $scope.updateContest = (contest) => {
                delete contest._id;
                $http.put(api + "/" + contest.year + "/" + contest.university + "/" + contest.project, contest).then((response) => {
                    $scope.status = response.status;
                    alert("El proyecto " + contest.project + " se ha actualizado correctamente");
                    getContest();
                });
            };

            function getContest() {
                $http.get(api + '/' + parseInt($routeParams.year) + '/' + $routeParams.university + '/' + $routeParams.project).then((response) => {
                    $scope.contest = response.data;
                });
            }

            getContest();
        }]);
