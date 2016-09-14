


angular.module('NotePairApp',[]).controller('ElevesListeController',function ($scope,$state,ElevesService) {
   $scope.ElevesList = ElevesService.query();
    $scope.Eleve=new ElevesService();

    $scope.addEleve=function(){
        $scope.Eleve.$save(function(){
            //retourner à la liste d'élèves
            $state.go('Eleves');
        });
    }
});