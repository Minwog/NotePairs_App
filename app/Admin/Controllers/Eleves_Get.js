

angular.module('NotePairApp',[])
    .controller('EleveEditController',function ($scope,$state,$stateParams,ElevesService) {
         $scope.getEleves=function(){
            $scope.Eleves=ElevesService.get({id:$stateParams.id});
         };

        $scope.getEleves();
    });