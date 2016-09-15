(function() {

    angular.module('NotePairApp')

        .controller('AddEleveController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService',
            function ($scope,$state,$stateParams,alerteService,ElevesService) {
                    console.log("dans le contrôleur AddEleveController")
                $scope.ElevesList = ElevesService.query();

//--- Methode add pour ajouter un Eleve à la liste ---//
                $scope.addEleve = function () {
                    $scope.Eleve = new ElevesService();
                    ElevesService.save($scope.Eleve, function () {
                        console.log("dans la fonction save");
                        //retourner à la liste d'élèves
                        $state.go('admin.students');
                    })
                }
            }
]);
})();