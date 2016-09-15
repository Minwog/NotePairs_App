
angular.module('NotePairApp')
    .controller('ElevesController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService', function ($scope,$state,$stateParams, alerteService, ElevesService) {

        $scope.ElevesList = ElevesService.query();

//--- Methode add pour ajouter un Eleve à la liste ---//
    $scope.addEleve=function(){
        $scope.Eleve=new ElevesService();
        $scope.Eleve.$save(function(){
            //retourner à la liste d'élèves
            $state.go('Eleves');
        })
    };


//--- Methode update pour modifier un Eleve à partir de son id ---//
    $scope.Eleve=ElevesService.query({id:$stateParams.id});

    $scope.updateEleves=function(){
        $scope.Eleve.$update(function(){
            //retourner à la liste d'élèves
            $state.go('Eleves');
        });
    };

//--- Methode get pour afficher un Eleve à partir de son id ---//
    $scope.getEleve=function(){
        $scope.Eleve=ElevesService.query({id:$stateParams.id});
    };
//--- Methode get pour afficher un Eleve à partir de son id ---//
    $scope.getAllEleves=function () {
        $scope.ElevesList= ElevesService.query();
    }

//--- Methode delete pour supprimer un Eleve à partir de son id ---//
    $scope.deleteEleve=function() {
        $scope.Eleve = ElevesService.query({id: $stateParams.id});
        if(alerteService.showPopup('Voulez-vous vraiment supprimer cet Eleve ?')){
            Eleve.$delete();
        }
    }
 //---- Control de la page

        $scope.add=function () {
            $state.go('admin.students.add')
        }
}]);