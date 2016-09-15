angular.module('NotePairApp')
    .controller('GroupesController',['$scope','$state','$stateParams', 'alerteService', function ($scope,$state,$stateParams, alerteService, ElevesService) {

        $scope.GroupeList = [{
            'groupe_id':1,
            'numero':'A380',
            'eleves':['Jeanneton','Céline ma cousine']
        }];
    }]);