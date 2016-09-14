

angular.module('NotePairApp',[])
    .controller('EleveGetAllController',function ($scope,$state,$stateParams,ElevesService) {
        $scope.Eleves = ElevesService.query();
    });