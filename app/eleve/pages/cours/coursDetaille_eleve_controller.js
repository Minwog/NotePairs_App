angular.module('NotePairApp')
    .controller('CoursDetailleEleveController',['$scope','$state','$stateParams', 'httpq','CoursService', function ($scope,$state,$stateParams,httpq,CoursService) {

        CoursService.get({id:$stateParams.id }).$promise.then(function(data){
            $scope.MonCours=data;
        });
        CoursService.getEnseignant($stateParams.id ).then(function(data){
            $scope.EnseignantsAssocies=data;
        })
        CoursService.getEval($stateParams.id ).then(function(data){
            $scope.Eval=data;
        });
    }]);