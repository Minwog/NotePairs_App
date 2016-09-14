
angular.module('NotePairApp').controller('ElevesController',function ($scope,$state,$stateParams,ElevesService) {
    $scope.ElevesList = ElevesService.query();

    $scope.addEleve=function(){
        $scope.Eleve=new ElevesService();
        $scope.Eleve.$save(function(){
            //retourner à la liste d'élèves
            $state.go('Eleves');
        })
    };


//--- Methode update pour modifier un Eleve à partir de son id ---//
    $scope.Eleve=ElevesService.get({id:$stateParams.id});

    $scope.updateEleves=function(){
        $scope.Eleve.$update(function(){
            //retourner à la liste d'élèves
            $state.go('Eleves');
        });
    };

//--- Methode get pour afficher un Eleve à partir de son id ---//
    $scope.getEleve=function(){
        $scope.Eleve=ElevesService.get({id:$stateParams.id});
    };

    $scope.getEleve();
});

    $scope.Eleve = ElevesService.get({})