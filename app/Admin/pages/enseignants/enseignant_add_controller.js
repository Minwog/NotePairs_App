angular.module('NotePairApp')

    .controller('AddEnseignantsController',['$scope','$state','$stateParams', 'alerteService', 'EnseignantsService','LocalEnseignantService', function ($scope,$state,$stateParams, alerteService, EnseignantsService,LocalEnseignantService) {

        $scope.newEnseignant = {
            Nom: '',
            Prenom: '',
            email: '',
            username: ''
        };

//--- Methode add pour ajouter un Enseignant à la liste ---//
        $scope.addEnseignant = function () {

            LocalElevesService.save($scope.newEnseignant);
            $state.go('admin.enseignants')
        };
    }]);