(function() {
    angular.module('NotePairApp')
        .controller('ElevesController', ['$scope', '$state', '$stateParams', 'alerteService', 'UserService', function ($scope, $state, $stateParams, alerteService, UserService) {

            UserService.getByRole(2).then(function(data){
                $scope.ElevesList=data;
            });


//--- Methode get pour afficher un Eleve à partir de son id ---//
            $scope.getEleve = function (id) {
                UserService.get(id).then(function (data) {
                    console.log(data)
                })
            };

//--- Methode delete pour supprimer un Eleve à partir de son id ---//
            $scope.deleteEleve = function (id) {
                if (alerteService.showPopup('Voulez-vous vraiment supprimer cet Eleve ?')) {
                    UserService.delete({id:id});
                    $scope.ElevesList.splice($scope.ElevesList.map(function(e) { return e.id}).indexOf('id'),1);


                }
            };

            $scope.getCours=function(id) {

                UserService.getCours(id).then(function (data) {
                    console.log(data);
                   return data
                });
            }

            //---- Control de la page

            $scope.goToAdd = function () {
                $state.go('admin.students.add')
            }

            $scope.goToUpdate = function (id) {
                $state.go('admin.students.update', {id: id})
            };



        }]);

}());