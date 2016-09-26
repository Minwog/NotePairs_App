angular.module('NotePairApp')
    .controller('EvaluationsController',['$scope','$state','$stateParams', 'httpq',  function ($scope,$state,$stateParams,httpq) {

        $scope.mps='dist/mps.json';
        $scope.file=false;
        $scope.choixExtension=false;
        $scope.critere=0;
        $scope.extensions=[".pdf", ".docx", ".java"];
        //$scope.evaluation.sections=localStorageService.get("sections");

        $scope.evaluation={
            "sections":[
                {
                    "id":1,
                    "nom":"Section 1",
                    "points":"5",
                    "typeRendu":"file",
                    "extension":null,
                    "criteres":[
                        {
                            "type":"commentaire"
                        },
                        {
                            "type":"jugement",
                            "description":"Jugez",
                            "points":2,
                            "precision":0.2
                        }
                    ]
                }
            ]
        }

        $scope.setFile=function(i){
            $scope.file=i;
        }

        $scope.choisirExtension=function(i){
            $scope.choixExtension=i;
        }

        $scope.setCritereType=function(i){
            $scope.critere=i;
        }

        $scope.createSection=function(){
            $scope.evaluation.sections.push(section);
           // localStorageService.set("sections", $scope.evaluation.sections);
        }

        $scope.createCritere=function(id){
            //A faire
        }
    }]);