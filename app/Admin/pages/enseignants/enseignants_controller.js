angular.module('NotePairApp')
    .controller('EnseignantController',['$scope','$state','$stateParams', 'alerteService', 'EnseignantsService', function ($scope,$state,$stateParams, alerteService, EnseignantsService) {

        $scope.EnseignantsList = EnseignantsService.query();

//--- Methode add pour ajouter un Enseignant à la liste ---//
        $scope.addEnseignant=function(){
            $scope.Enseignant=new EnseignantsService();
            $scope.Enseignant.$save(function(){
                //retourner à la liste d'élèves
                $state.go('Enseignant');
            })
        };


//--- Methode update pour modifier un Enseignant à partir de son id ---//
        $scope.Enseignant=EnseignantsService.get({id:$stateParams.id});

        $scope.updateEnseignant=function(){
            $scope.Enseignant.$update(function(){
                //retourner à la liste d'Enseignants
                $state.go('Enseignant');
            });
        };

//--- Methode get pour afficher un Enseignant à partir de son id ---//
        $scope.getEnseignant=function(){
            $scope.Enseignant=EnseignantsService.get({id:$stateParams.id});
        };
//--- Methode get pour afficher un Enseignant à partir de son id ---//
        $scope.getAllEnseignants=function () {
            $scope.EnseignantsList= EnseignantsService.query();
        }

//--- Methode delete pour supprimer un Enseignant à partir de son id ---//
        $scope.deleteEnseignant=function() {
            $scope.Enseignant = EnseignantsService.get({id: $stateParams.id});
            if(alerteService.showPopup('Voulez-vous vraiment supprimer cet Enseignant ?')){
                Enseignant.$delete();
            }
        }
    }]);