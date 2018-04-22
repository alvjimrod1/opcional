/* global angular */

angular.module("openSourceContestsApp").controller("ListCtrl", ["$scope","$http", function($scope,$http) {
            console.log("List Ctrl initialized!");
            var api = "/api/v2/open-source-contests";

            $scope.addContest = () => {
                $http.post(api, $scope.newContest).then((response) => {
                        $scope.status = "Status:" + response.status;
                        getContests();
                    });
            };

            $scope.removeContest = (contest) => {
                $http.delete(api + "/" + contest.year + "/" + contest.university + "/" + contest.project).then((response) => {
                        $scope.status = response.status;
                        getContests();
                    });
            };

            $scope.removeContests = () => {
                $http.delete(api).then((response) => {
                        $scope.status = response.status;
                        getContests();
                    });
            };

            $scope.updateContest = (contest) => {
                console.log(contest)
                delete contest._id;
                console.log(contest)
                $http.put(api + "/" + contest.year + "/" + contest.university + "/" + contest.project, contest).then((response) => {
                        $scope.status = response.status;
                        getContests();
                    });
            };

            $scope.loadInitialContests = () => {
                $http.get(api + "/loadInitialData").then((response) => {
                        $scope.status = response.status;
                    });
                        getContests();
            };

            function getContests() {
                $http.get(api).then((response) => {
                    $scope.contests = response.data;
                    });
            };

            getContests();
        }]);
