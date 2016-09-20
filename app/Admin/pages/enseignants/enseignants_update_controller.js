angular.module('NotePairApp')
    .controller('UpdateEnseignantsController',['$scope','$state','$stateParams', 'alerteService', 'EnseignantsService','LocalEnseignantService', function ($scope,$state,$stateParams, alerteService, EnseignantsService,LocalEnseignantService) {

        //--- Methode update pour modifier un enseignnt à partir de son id ---//

        LocalEnseignantService.get($stateParams.id).then(function(data){
            console.log(data);
            $scope.Enseignant=data;
        });

        $scope.updateEnseignant = function () {
            LocalEnseignantService.update($scope.Enseignant);
            $state.go('admin.enseignants');
        }

        $(document).ready(function(){
            $('.selectpicker').selectpicker();
        });

}]);
