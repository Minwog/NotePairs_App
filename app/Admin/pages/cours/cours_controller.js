angular.module('NotePairApp')
    .controller('CoursController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService', 'httpq', function ($scope,$state,$stateParams, alerteService, ElevesService, httpq) {
        httpq.get("resources/json/cours.json")
            .then(function(data) {
                $scope.coursList = data;
            });



        //---- Control de la page

        $scope.goToAdd=function () {
            $state.go('admin.cours.add')
        };

        $scope.goToUpdate=function (id) {
            $state.go('admin.cours.update',{id:id})
        };

        //----------- fonctions utiles de recherche ( démo/localstorage)


    }]);