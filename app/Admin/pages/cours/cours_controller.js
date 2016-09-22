angular.module('NotePairApp')
    .controller('CoursController',['$scope','$state','$stateParams', 'alerteService', 'LocalCoursService',function ($scope,$state,$stateParams, alerteService, LocalCoursService) {

        LocalCoursService.query().then(function (data) {
            $scope.CoursList=data;
        });

        $scope.deleteCours=function (id) {
            if(alerteService.showPopup('Voulez-vous vraiment supprimer ce groupe ?')){
                LocalCoursService.delete(id);
            }
            $state.go('admin.cours')
        };

        $scope.goToAdd=function () {
            $state.go('admin.cours.add');
        }

        $scope.goToUpdate=function (id) {
            $state.go('admin.cours.update',{id:id})
        }
    }])


    .controller('UpdateCoursController',['$scope','$state','$stateParams', 'alerteService', 'LocalCoursService', 'LocalElevesService', 'LocalGroupeService', 'LocalEnseignantService', function ($scope,$state,$stateParams, alerteService, LocalCoursService, LocalElevesService, LocalGroupeService,LocalEnseignantService) {


        LocalCoursService.get($stateParams.id).then(function(data){
            console.log(data);
            $scope.Cours=data;
        });

        LocalElevesService.query().then(function (data) {
            $scope.ListEleves=data;
        });

        LocalEnseignantService.query().then(function (data) {
            $scope.ListEnseignant=data
        });

        $scope.updateCours = function () {

                LocalGroupeService.update($scope.Cours);
                console.log($scope.Cours);
                $state.go('admin.cours');
        };

        $(document).ready(function(){
            $('.selectpicker').selectpicker();
        });


    }])

    .controller('AddCoursController',['$scope','$state','$stateParams', 'alerteService', 'LocalCoursService','LocalElevesService','LocalEnseignantService',function ($scope,$state,$stateParams, alerteService, LocalGroupeService, LocalElevesService, LocalEnseignantService) {

        LocalElevesService.query().$promise.then(function (data) {
            $scope.ListEleves=data;
        });

        LocalEnseignantService.query().$promise.then(function (data) {
            $scope.ListEnseignant=data;
        })


        $scope.newCours = {
            groupes_id: Math.floor((Math.random() * 100000)),
            numero:'',
            cours:[],
            eleves:[]
        };

//--- Methode add pour ajouter un Groupe à la liste ---//
        $scope.addCours = function () {

            LocalCoursService.save($scope.newCours);
            $state.go('admin.cours')
        };

        $(document).ready(function(){
            $('.selectpicker').selectpicker();
        });

    }]);