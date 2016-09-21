angular.module('NotePairApp')
    .controller('EvaluationsController',['$scope','$state','$stateParams', 'httpq',  function ($scope,$state,$stateParams,httpq) {

        $scope.mps='dist/mps.json';

    }]);