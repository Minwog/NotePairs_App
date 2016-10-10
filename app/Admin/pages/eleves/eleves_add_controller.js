(function(){
    angular.module('NotePairApp')
        .controller('ElevesAddController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService','CoursService', function ($scope,$state,$stateParams, alerteService, ElevesService,CoursService) {


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
                $state.go('admin.students', {reload:true})
            };


// appel des cours pour menu deroulant

            CoursService.query().$promise.then(function (data) {
                console.log(data);
                $scope.cours = data;
                $('.selectpicker').selectpicker('refresh');
            });


            $(document).ready(function(){
                $('.selectpicker').selectpicker();

                });

        }]);
})();