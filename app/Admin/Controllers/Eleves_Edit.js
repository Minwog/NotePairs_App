

angular.module('NotePairApp',[])
    .controller('EleveEditController',function ($scope,$state,$stateParams,ElevesService) {
        $scope.updateEleves=function(){
            $scope.Eleves.$update(function(){
                //retourner à la liste d'élèves
                $state.go('Eleves');
            });
        };

        $scope.loadEleves=function(){
            $scope.Eleves=ElevesService.get({id:$stateParams.id});
        };

        $scope.loadEleves();
    });