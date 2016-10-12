(function() {
    angular.module('NotePairApp')
        .controller('CoursController', ['$scope', '$state', '$stateParams', 'alerteService', 'CoursService', function ($scope, $state, $stateParams, alerteService, CoursService) {

            CoursService.query().$promise.then(function (data) {
                $scope.CoursList = data;
            });

            $scope.deleteCours = function (id) {
                if (alerteService.showPopup('Voulez-vous vraiment supprimer ce Cours ?')) {
                    CoursService.delete({id: id});
                    $scope.CoursList.splice($scope.CoursList.map(function (e) {
                        return e.id
                    }).indexOf(id), 1)

                }
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

        .controller('UpdateCoursController', ['$scope', '$state', '$stateParams', 'alerteService', 'CoursService', 'UserService','CategorieService', function ($scope, $state, $stateParams, alerteService, CoursService, UserService, CategorieService) {


        CoursService.get({id: $stateParams.id}).$promise.then(function (data) {
            $scope.Cours = data;
        });

        CategorieService.query().$promise.then(function (data) {
            $scope.categorie=data;
        })



        $scope.updateCours = function () {

            CoursService.update($scope.Cours);
            console.log($scope.Cours);
            $state.go('admin.cours');
        };

        CoursService.getEnseignant($stateParams.id).then(function (data) {
            $scope.UsersList = data;
        });

        $(document).ready(function () {
            $('.selectpicker').selectpicker();
        });

        $scope.deleteUser = function(userid) {
            CoursService.deleteUser($stateParams.id, userid);
                $scope.UsersList.splice($scope.UsersList.map(function (e) {
                    return e.id
                }).indexOf(userid), 1)
        };

        $scope.goToAddUser = function (role) {
            $state.go('admin.cours.addUser', {id: $scope.Cours.id, role: role})
        }

            $(document).ready(function () {
                $('.selectpicker').selectpicker();
            });

         $scope.annuler=function () {
             $state.go('admin.cours');
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

            $scope.annuler=function () {
                $state.go('admin.cours');
            }

        }])

})();

(function () {
    angular.module('NotePairApp')

    .controller('AddUserCoursController',['$scope','$stateParams','UserService','CoursService','$state',function($scope,$stateParams,UserService,CoursService,$state){

        UserService.getByRole($stateParams.role).then(function (data) {
            $scope.UsersList=data;
        });


        CoursService.getEnseignant($stateParams.id).then(function (data) {
               $scope.UserOfCours = data;
            });


        $scope.NewUsers=[];



       $scope.Ajouter=function(){
           CoursService.addUser($stateParams.id,$scope.NewUsers).then(function(data){
               return data;

           })

           $state.go('admin.cours.update',{id:$stateParams.id, reload:true})
       }


    }])

})();