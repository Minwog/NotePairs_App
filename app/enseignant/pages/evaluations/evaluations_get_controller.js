/**
 * Created by aurore on 13/10/2016.
 */

angular.module('NotePairApp')
    .controller('GetEvaluationsController',['$scope','$state','$stateParams', 'httpq', 'LocalCoursService', 'LocalEnseignantService', 'LocalEvaluationsService', 'UserService', 'EvaluationsService', function ($scope,$state,$stateParams,httpq,LocalCoursService,LocalEnseignantService,LocalEvaluationsService,UserService,EvaluationsService) {

        $scope.enseignant='';
        $scope.enseignant.id=1;

        EvaluationsService.getMesEvaluations($scope.enseignant.id)
            .then(function (data) {
                $scope.evaluations = data;
            })

    }]);