angular.module('NotePairApp')
    .controller('EvaluationController',['$scope', '$state', function ($scope, $state) {
        $scope.goToHistorique = function () {

            $state.go('eleve.historique')
        };
    }]);
