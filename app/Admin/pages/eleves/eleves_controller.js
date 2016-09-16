
angular.module('NotePairApp')
    .controller('ElevesController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService','LocalElevesService', function ($scope,$state,$stateParams, alerteService, ElevesService,LocalElevesService) {

       LocalElevesService.query().then(function (data) {
           $scope.ElevesList=data;

       });



        $scope.newEleve={
        'Nom':'',
        'Prenom':'',
        'email':'',
        'username':''
        };

//--- Methode add pour ajouter un Eleve à la liste ---//
        $scope.addEleve = function () {

            LocalElevesService.save($scope.newEleve);
            $state.go('admin.students')
        };




//--- Methode get pour afficher un Eleve à partir de son id ---//
    $scope.getEleve=function(){
        $scope.Eleve=ElevesService.query({id:$stateParams.id});
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