(function() {

    angular.module('NotePairApp')

        .controller('AddEleveController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService',
            function ($scope,$state,$stateParams,alerteService,ElevesService) {

//--- Methode add pour ajouter un Eleve à la liste ---//
                $scope.addEleve = function () {
                    $scope.Eleve = new ElevesService();
                    $scope.Eleve.$save(function () {
                        //retourner à la liste d'élèves
                        $state.go('Eleves');
                    })
                }
            }
]);
})();