/**
 * Created by aurore on 14/10/2016.
 */
angular.module('NotePairApp')
    .controller('SectionsController',['$scope','$state','$stateParams', 'httpq', 'LocalCoursService', 'LocalEnseignantService', 'LocalEvaluationsService', 'UserService', 'EvaluationsService', 'localStorageService', function ($scope,$state,$stateParams,httpq,LocalCoursService,LocalEnseignantService,localEvaluationsService,UserService,EvaluationsService, LocalStorageService) {

        $scope.critereList=[];

        EvaluationsService.getCriteres($scope.section.id)
            .then(function (data) {
                $scope.critereList=data;
                console.log($scope.critereList);
            });


        $scope.addCritere=function(critere) {
            if ($scope.critereList != null) {
                critere.ordre = $scope.critereList.length + 1;
            } else {
                critere.ordre = 1;
            }
            EvaluationsService.createCritere($scope.section.id, critere)
                .then(function(data) {
                    critere=data;
                });
            $scope.critereList=EvaluationsService.getCriteres($scope.section.id);
            console.log($scope.section);
            console.log($scope.critereList);
        }

        $scope.deleteCritere=function(id){
            EvaluationsService.deleteCritere(id)
                .then(function(data) {
                    console.log(data);
                    critere=data;
                });
            $scope.critereList.remove($scope.critereList.indexOf(critere));
        }


        $scope.changeOrdreSectionUp=function(){
            EvaluationsService.updateOrdreSection($scope.section.id, $scope.section.ordre +1);
        }

        $scope.changeOrdreSectionDown=function(){
            EvaluationsService.updateOrdreSection($scope.section.id, $scope.section.ordre -1);
        }

        $scope.changeOrdreCritereUp=function(critere){
            EvaluationsService.updateOrdreSection(critere.id, critere.ordre +1);
        }

        $scope.changeOrdreCritereDown=function(critere){
            EvaluationsService.updateOrdreSection(critere.id, critere.ordre -1);
        }

    }]);