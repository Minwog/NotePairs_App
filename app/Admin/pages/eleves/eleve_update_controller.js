(function() {

    angular.module('NotePairApp')

        .controller('UpdateEleveController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService',
            function ($scope,$state,$stateParams,alerteService,ElevesService) {

//--- Methode update pour modifier un Eleve à partir de son id ---//
                $scope.Eleve = ElevesService.query({id: $stateParams.id});

                $scope.updateEleves = function () {
                    $scope.Eleve.$update(function () {
                        //retourner à la liste d'élèves
                        $state.go('Eleves');
                    });
                };
            }

        ]);
})();