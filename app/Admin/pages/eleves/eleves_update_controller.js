(function() {

    angular.module('NotePairApp')

        .controller('UpdateEleveController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService','LocalElevesService',function($scope,$state,$stateParams, alerteService, ElevesService,LocalElevesService){


//--- Methode update pour modifier un Eleve à partir de son id ---//

    $scope.Eleve = LocalElevesService.get($stateParams.id);
            console.log(LocalElevesService.get($stateParams.id));

    $scope.updateEleves = function () {
        LocalElevesService.update($scope.Eleve);
        $state.go('admin.students');
    }

    }])
})();