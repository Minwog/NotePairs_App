angular.module('NotePairApp')
    .controller('CoursController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService', 'httpq', function ($scope,$state,$stateParams, alerteService, ElevesService, httpq) {
        httpq.get("resources/json/cours.json")
            .then(function(data) {
                $scope.coursList = data;
            });

    }]);