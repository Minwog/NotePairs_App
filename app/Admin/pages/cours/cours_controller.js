(function() {
    angular.module('NotePairApp')
        .controller('CoursController', ['$scope', '$state', '$stateParams', 'alerteService', 'CoursService', function ($scope, $state, $stateParams, alerteService, CoursService) {

            CoursService.query().$promise.then(function (data) {
                $scope.CoursList = data;
            });

            $scope.deleteCours = function (id) {
                if (alerteService.showPopup('Voulez-vous vraiment supprimer ce groupe ?')) {
                    CoursService.delete({id:id});
                }
                $state.go('admin.cours')
            };

            $scope.goToAdd = function () {
                $state.go('admin.cours.add');
            }

            $scope.goToUpdate = function (id) {
                $state.go('admin.cours.update', {id: id})
            }
        }])


        .controller('UpdateCoursController', ['$scope', '$state', '$stateParams', 'alerteService', 'CoursService', 'UserService', 'LocalGroupeService', 'UserService', function ($scope, $state, $stateParams, alerteService, CoursService, UserService, LocalGroupeService, UserService) {


            CoursService.get($stateParams.id).then(function (data) {
                console.log(data);
                $scope.Cours = data;
            });

            UserService.getByRole(2).then(function (data) {
                $scope.ListEleves = data;
            });

            UserService.getByRole(3).then(function (data) {
                $scope.ListEnseignant = data
            });

            $scope.updateCours = function () {

                LocalGroupeService.update($scope.Cours);
                console.log($scope.Cours);
                $state.go('admin.cours');
            };

            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });


        }])

        .controller('AddCoursController', ['$scope', '$state', '$stateParams', 'alerteService', 'CoursService', 'UserService', 'UserService', function ($scope, $state, $stateParams, alerteService, LocalGroupeService, UserService, UserService) {

            UserService.getByRole(2).then(function (data) {
                $scope.ListEleves = data;
            });

            UserService.getByRole(3).then(function (data) {
                $scope.ListEnseignant = data;
            });


            $scope.newCours = {
                numero: '',
                cours: [],
                eleves: [],
                groupes: [],
                categorie:'',
                image:''
            };

//--- Methode add pour ajouter un Groupe à la liste ---//
            $scope.addCours = function () {

                CoursService.save($scope.newCours);
                $state.go('admin.cours')
            };

            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });

        }]);

})();