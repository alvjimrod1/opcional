/* global angular */

angular.module("AppManager").controller("ListCtrl", ["$scope", "$http", function ($scope, $http) {
    console.log("List Ctrl initialized!");
    var api = "/api/v2/open-source-contests";
    var pageSize = 10;
    var page = 0;
    var searchPath = '';

    $scope.addContest = function () {
        console.log($scope.newContest);
        nc = { ...$scope.newContest };
        nc.team = [{ "member": nc.team }];
        console.log(nc)
        $http.post(api, nc).then(function successCallback(response) {
            $scope.status = "Status : " + response.status + "( Contest added correctly)";
            alert("Proyecto agregado correctamente");
            getContests();
        }, function errorCallback(response) {
            console.log(response.status);
            if (response.status == 400) {
                alert("¡Necesitas rellenar todos los campos!");
            }
            if (response.status == 409) {
                alert("¡Este proyecto ya existe!");
            }
        });
        delete $scope.newContest;
        getContests();
    };

    $scope.removeContest = (contest) => {
        $http.delete(api + "/" + contest.year + "/" + contest.university + "/" + contest.project).then((response) => {
            $scope.status = response.status;
            alert("Se han eliminado el proyecto: " + contest.project);
            getContests();
        });
    };

    $scope.removeContests = () => {
        $http.delete(api).then((response) => {
            $scope.status = response.status;
            alert("Se han eliminado todos los proyectos");
            getContests();
        });
    };

    $scope.updateContest = (contest) => {
        console.log(contest);
        delete contest._id;
        console.log(contest);
        $http.put(api + "/" + contest.year + "/" + contest.university + "/" + contest.project, contest).then((response) => {
            $scope.status = response.status;
            alert("El proyecto " + contest.project + " se ha actualizado correctamente");
            getContests();
        });
    };

    $scope.loadInitialContests = () => {
        $http.get(api + "/loadInitialData").then((response) => {
            $scope.status = response.status;
            alert("Se han agregado todos los proyectos iniciales");
        });
        getContests();
    };

    function getContests() {
        $http.get(api + '?limit=' + pageSize + '&offset=' + page * pageSize).then((response) => {
            $scope.contests = response.data;
        });
    };

    $scope.searchContest = () => {
        console.log("has buscado: " + $scope.contest);
        $http.get(api + '?limit=' + pageSize + '&offset=' + page * pageSize + '&year=' + $scope.contest).then((response) => {
            $scope.contests = response.data;
            searchPath = '&year=' + $scope.contest;
            alert("Se han encontrado: " + $scope.contests.length + " resultados");
        });
    };

    $scope.previusPage = () => {
        if (page > 0) {
            console.log("previusPage");
            $http.get(api + '?limit=' + pageSize + '&offset=' + (page - 1) * pageSize + searchPath).then((response) => {
                $scope.contests = response.data;
                page = page - 1;
            });
        } else {
            console.log("NOT FOUND previusPage");
        }
    };

    $scope.nextPage = () => {
        console.log("nextPage");
        $http.get(api + '?limit=' + pageSize + '&offset=' + (page + 1) * pageSize + searchPath).then((response) => {
            if (response.data.length !== 0) {
                $scope.contests = response.data;
                page = page + 1;
            }
        });
    };

    getContests();
}]);
