
angular.module('NotePairApp').controller('EnseignantsController',function ($scope,$state,$stateParams,EnseignantsService) {
    $scope.EnseignantsList = EnseignantsService.query();
    $scope.Enseignant=new EnseignantsService();

    $scope.addEnseignant=function(){
        $scope.Enseignant.$save(function(){
            //retourner à la liste d'élèves
            $state.go('Enseignants');
        })
    }

    $scope.updateEnseignant=function(){
        $scope.Enseignant.$update(function(){
            //retourner à la liste d'élèves
            $state.go('Enseignants');
        });
    };


    $scope.getEnseignant=function(){
        $scope.Eleve=EnseignantsService.get({id:$stateParams.id});
    };

    $scope.getEnseignant();
});