(function() {

    angular.module('NotePairApp')

        .controller('UpdateEleveController',['$scope','$state','$stateParams', 'alerteService', 'UserService',function($scope,$state,$stateParams, alerteService, UserService){


//--- Methode update pour modifier un Eleve à partir de son id ---//

            UserService.get({id:$stateParams.id}).$promise.then(function(data){
                console.log(data);
                $scope.Eleve=data;
            });

    $scope.updateEleves = function () {
        UserService.update($scope.Eleve);
        $state.go('admin.students',{reload:true});
    }

            $(document).ready(function(){
                $('.selectpicker').selectpicker();
            });

    }])
})();