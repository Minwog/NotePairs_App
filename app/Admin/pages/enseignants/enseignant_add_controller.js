angular.module('NotePairApp')

    .controller('AddEnseignantsController',['$scope','$state','$stateParams', 'alerteService', 'EnseignantsService','LocalEnseignantService', function ($scope,$state,$stateParams, alerteService, EnseignantsService,LocalEnseignantService) {

        $scope.newEnseignant = {
            enseignant_id: Math.floor((Math.random() * 100000)),
            Nom: '',
            Prenom: '',
            email: '',
            username: '',
            cours:[]
        };

//--- Methode add pour ajouter un Enseignant à la liste ---//
        $scope.addEnseignant = function () {

            LocalEnseignantService.save($scope.newEnseignant);
            $state.go('admin.enseignants')
        };
    }]);