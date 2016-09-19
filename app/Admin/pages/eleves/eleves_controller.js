
angular.module('NotePairApp')
    .controller('ElevesController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService','LocalElevesService', function ($scope,$state,$stateParams, alerteService, ElevesService,LocalElevesService) {

       LocalElevesService.query().then(function (data) {
           $scope.ElevesList=data;

       });


//--- Methode get pour afficher un Eleve à partir de son id ---//
    $scope.getEleve=function(id){
       LocalElevesService.get(id).then(function(data){
           console.log(data)
       })
    };

//--- Methode delete pour supprimer un Eleve à partir de son id ---//
    $scope.deleteEleve=function(id) {
        if(alerteService.showPopup('Voulez-vous vraiment supprimer cet Eleve ?')){
           LocalElevesService.delete(id);
            $state.go('admin.students')

        }
    };

 //---- Control de la page

        $scope.goToAdd=function () {
            $state.go('admin.students.add')
        }

        $scope.goToUpdate=function (id) {
            $state.go('admin.students.update',{id:id})
        };

        //----------- fonctions utiles de recherche ( démo/localstorage)


}]);