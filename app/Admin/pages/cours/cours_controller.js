(function() {
    angular.module('NotePairApp')
        .controller('CoursController', ['$scope', '$state', '$stateParams', 'alerteService', 'CoursService', function ($scope, $state, $stateParams, alerteService, CoursService) {

            CoursService.query().$promise.then(function (data) {
                $scope.CoursList = data;
            });

            $scope.deleteCours = function (id) {
                if (alerteService.showPopup('Voulez-vous vraiment supprimer ce groupe ?')) {
                    CoursService.delete({id: id});
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
})();

(function () {
    angular.module('NotePairApp')

        .controller('UpdateCoursController', ['$scope', '$state', '$stateParams', 'alerteService', 'CoursService', 'UserService', function ($scope, $state, $stateParams, alerteService, CoursService, UserService) {


        CoursService.get({id: $stateParams.id}).$promise.then(function (data) {
            $scope.Cours = data;
        });

        UserService.getByRole(2).then(function (data) {
            $scope.ListEleves = data;
        });

        UserService.getByRole(3).then(function (data) {
            $scope.ListEnseignant = data
        });

        $scope.updateCours = function () {

            CoursService.update($scope.Cours);
            console.log($scope.Cours);
            $state.go('admin.cours');
        };

        CoursService.getEnseignant($stateParams.id).then(function (data) {
            console.log(data);
            $scope.UsersList = data;
        });

        $(document).ready(function () {
            $('.selectpicker').selectpicker();
        });

        $scope.deleteUser = function (coursid, userid) {
            CoursService.deleteUser(coursid, userid);
            $scope.UsersList.splice($scope.UsersList.map(function (e) {
                return e.id
            }).indexOf('userid'), 1)
        }

        $scope.goToAddUser = function (role) {
            $state.go('admin.cours.addUser', {id: $scope.Cours.id, role: role})
        }


    }])

})();

(function () {
    angular.module('NotePairApp')

        .controller('AddCoursController', ['$scope', '$state', '$stateParams', 'alerteService', 'CoursService', 'UserService', function ($scope, $state, $stateParams, alerteService, CoursService, UserService) {

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
                categorie_id: '',
                image: ''
            };

//--- Methode add pour ajouter un Groupe à la liste ---//
            $scope.addCours = function () {

                CoursService.save($scope.newCours);
                $state.go('admin.cours', {reload: true})
            };

            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });

        }])

})();

(function () {
    angular.module('NotePairApp')

    .controller('AddUserCoursController',['$stateParams','UserService','CoursService',function($stateParams,UserService,CoursService){
        var vm=this;
        vm.roleid=$stateParams.role;
        vm.coursid=$stateParams.id;

        UserService.getByRole(vm.roleid).then(function (data) {
            console.log(data);
            console.log(vm.roleid)
            vm.UsersList=data;
        });

        vm.UserOfCours=CoursService.getEnseignant(vm.coursid)

    }])

})();