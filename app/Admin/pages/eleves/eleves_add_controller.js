angular.module('NotePairApp')
    .controller('ElevesAddController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService','LocalElevesService', function ($scope,$state,$stateParams, alerteService, ElevesService,LocalElevesService) {


        $scope.newEleve={
            'Nom':'',
            'Prenom':'',
            'email':'',
            'username':'',
            'role_id':2
        };

//--- Methode add pour ajouter un Eleve à la liste ---//
        $scope.addEleve = function () {

            ElevesService.save($scope.newEleve);
            $state.go('admin.students')
        };


// appel des cours pour menu deroulant

        $scope.cours=[];

        $scope.groupes=['A33','B227','C423','D67'];



            $(document).ready(function(){
                $('.selectpicker').selectpicker();
            });

    }]);