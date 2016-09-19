angular.module('NotePairApp')
    .controller('ElevesAddController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService','LocalElevesService', function ($scope,$state,$stateParams, alerteService, ElevesService,LocalElevesService) {


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
// appel des cours pour menu deroulant

        $scope.cours=[{nom:"Economie d'entreprise",section:'économie'},
            {nom:"RASS",section:'traitement du signal'},
            {nom:"Telecommunications",section:'traitement du signal'},
            {nom:"Architecture des ordibateurs",section:'informatique'},
            {nom:"Systèmes et programmation réseau",section:'informatique'}];

        $scope.groupes=['A33','B227','C423','D67'];



            $(document).ready(function(){
                $('.selectpicker').selectpicker();
            });

    }]);