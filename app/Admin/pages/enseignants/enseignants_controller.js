angular.module('NotePairApp')
    .controller('EnseignantsController',['$scope','$state','$stateParams', 'alerteService', 'EnseignantsService','LocalEnseignantService', function ($scope,$state,$stateParams, alerteService, EnseignantsService,LocalEnseignantService) {

        LocalEnseignantService.query().then(function (data) {
            $scope.EnseignantsList=data;
        });

//--- Methode get pour afficher un Enseignant à partir de son id ---//
        $scope.getEnseignant=function(){
            $scope.Enseignant=EnseignantsService.query({id:$stateParams.id});
        };
//--- Methode get pour afficher un Enseignant à partir de son id ---//
        $scope.getAllEnseignants=function () {
            $scope.EnseignantsList= EnseignantsService.query();
        };

//--- Methode delete pour supprimer un Enseignant à partir de son id ---//
        $scope.deleteEnseignant=function(id) {
            if(alerteService.showPopup('Voulez-vous vraiment supprimer cet Enseignant ?')){
                LocalEnseignantService.delete(id);
            }
            $state.go('admin.enseignants')
        };

        $scope.goToAdd=function () {
            $state.go('admin.enseignants.add')
        };

        $scope.goToUpdate=function (_id) {

            $state.go('admin.enseignants.update',{id:_id});
            $scope.Enseignant = EnseignantsService.query({id:_id})
        };

        $(document).ready(function(){
            $('.selectpicker').selectpicker();
        });
    }]);