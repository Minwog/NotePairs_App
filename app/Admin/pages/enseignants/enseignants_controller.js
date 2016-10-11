angular.module('NotePairApp')
    .controller('EnseignantsController',['$scope','$state','$stateParams', 'alerteService', 'UserService', function ($scope,$state,$stateParams, alerteService, UserService) {

        UserService.getByRole(3).then(function(data){
            $scope.EnseignantsList=data;
        });


//--- Methode get pour afficher un Eleve à partir de son id ---//
        $scope.getEnseignant = function (id) {
            UserService.get(id).then(function (data) {
                console.log(data)
            })
        };

//--- Methode delete pour supprimer un Eleve à partir de son id ---//
        $scope.deleteEnseignant = function (id) {
            if (alerteService.showPopup('Voulez-vous vraiment supprimer cet Eleve ?')) {
                UserService.delete({id:id});
                $scope.EnseignantsList.splice($scope.EnseignantsList.map(function(e) { return e.id}).indexOf('id'),1);


            }
        };

        $scope.getCours=function(id) {

            UserService.getCours(id).then(function (data) {
                console.log(data);
                return data
            });
        }

        $scope.goToAdd=function () {
            $state.go('admin.enseignants.add')
        };

        $scope.goToUpdate=function (_id) {

            $state.go('admin.enseignants.update',{id:_id});
            $scope.Enseignant = UserService.query({id:_id})
        };

        $(document).ready(function(){
            $('.selectpicker').selectpicker();
        });
    }]);