angular.module('NotePairApp')
    .controller('GroupeController',['$scope', '$state','GroupesService','UserService', function ($scope, $state, GroupesService,UserService) {

        UserService.getCours(1).then(function(data){
            $scope.MesCours=data;
        });

        GroupesService.getGroupeByUser(1).then(function(data){
            $scope.MesGroupes=data;
        });

    }]);
