
angular.module('NotePairApp')
    .controller('ElevesController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService', function ($scope,$state,$stateParams, alerteService, ElevesService) {

        $scope.ElevesList = ElevesService.query();


//--- Methode get pour afficher un Eleve à partir de son id ---//
    $scope.getEleve=function(){
        $scope.Eleve=ElevesService.query({id:$stateParams.id});
    };

//--- Methode delete pour supprimer un Eleve à partir de son id ---//
    $scope.deleteEleve=function() {
        $scope.Eleve = ElevesService.query({id: $stateParams.id});
        if(alerteService.showPopup('Voulez-vous vraiment supprimer cet Eleve ?')){
            Eleve.$delete();
        }
    };

 //---- Control de la page

        $scope.add=function () {
            $state.go('admin.students.add')
        }
}]);