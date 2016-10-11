angular.module('NotePairApp')

    .controller('AddEnseignantsController',['$scope','$state','$stateParams', 'alerteService', 'UserService', function ($scope,$state,$stateParams, alerteService, UserService) {

        $scope.newEnseignant = {
            Nom: '',
            Prenom: '',
            email: '',
            username: '',
            cours:[],
            role_id: 3
        };

//--- Methode add pour ajouter un Enseignant à la liste ---//
        $scope.addEnseignant = function () {

            UserService.save($scope.newEnseignant);
            $state.go('admin.enseignants')
        };
    }]);