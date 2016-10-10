(function() {

    angular.module('NotePairApp')

        .controller('UpdateEleveController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService',function($scope,$state,$stateParams, alerteService, ElevesService){


//--- Methode update pour modifier un Eleve à partir de son id ---//

            ElevesService.get({id:$stateParams.id}).$promise.then(function(data){
                console.log(data);
                $scope.Eleve=data;
            });

    $scope.updateEleves = function () {
        ElevesService.update($scope.Eleve);
        $state.go('admin.students',{reload:true});
    }

            $(document).ready(function(){
                $('.selectpicker').selectpicker();
            });

    }])
})();