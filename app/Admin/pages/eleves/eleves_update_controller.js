(function() {

    angular.module('NotePairApp')

        .controller('UpdateEleveController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService','LocalElevesService',function($scope,$state,$stateParams, alerteService, ElevesService,LocalElevesService){

            LocalElevesService.query();

//--- Methode update pour modifier un Eleve à partir de son id ---//

            LocalElevesService.get($stateParams.id).then(function(data){
                console.log(data);
                $scope.Eleve=data;
            });

    $scope.updateEleves = function () {
        LocalElevesService.update($scope.Eleve);
        $state.go('admin.students');
    }

            $(document).ready(function(){
                $('.selectpicker').selectpicker();
            });

    }])
})();