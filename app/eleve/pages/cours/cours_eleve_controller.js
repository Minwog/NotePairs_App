angular.module('NotePairApp')
    .controller('CoursEleveController',['$scope','$state','$stateParams', 'httpq','UserService', function ($scope,$state,$stateParams,httpq,UserService) {

        $scope.eleveCo = UserService.get({id:1});

        UserService.getCours(1).then(function(data){
            $scope.MesCours=data;
        });

        $scope.goToCours = function (id) {
            $state.go('eleve.coursDetaille',{id:id})
        }
    }]);