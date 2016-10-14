angular.module('NotePairApp')
    .controller('EvaluationController',['$scope', '$state','UserService', function ($scope, $state,UserService) {
        $scope.goToHistorique = function () {

            $state.go('eleve.historique')
        }
        UserService.getCopiesByUser(1).then(function(data) {
            $scope.copiesARendre = data;
        });
        UserService.getEvalByUser(1).then(function(data){
            $scope.Eval=data;
        });
    }]);
