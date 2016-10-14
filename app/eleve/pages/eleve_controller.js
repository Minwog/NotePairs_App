angular.module('NotePairApp')
    .controller('EleveController',['$scope','$state','$stateParams', 'httpq', 'textAngularManager','UserService', function ($scope,$state,$stateParams,httpq,textAngularManager,UserService) {

        $scope.version = textAngularManager.getVersion();
        $scope.versionNumber = $scope.version.substring(1);
        $scope.disabled = false;
        $scope.tab=0;

        $scope.eleveCo = UserService.get({id:1});

        UserService.getCours(1).then(function(data){
            $scope.MesCours=data;
        });
        UserService.getCopiesByUser(1).then(function(data) {
            $scope.copiesARendre = data;
        });
        UserService.getEvalByUser(1).then(function(data){
            $scope.Eval=data;
        });
        $scope.setTab=function(i){
            $scope.tab=i;
        }

        $scope.isTab=function(i){
            return ($scope.tab==i);
        }

        $scope.panelColor = ["panel-warning", "panel-info", "panel-success", "panel-danger" ]

        $scope.slider = {
            value:0,
            options: {
                floor: -1,
                ceil: 6,
                step: 0.1,
                precision: 2
            }
        };

    }])