angular.module('NotePairApp')
    .controller('EvaluationsController',['$scope','$state','$stateParams', 'httpq', 'LocalCoursService', 'LocalEnseignantService', function ($scope,$state,$stateParams,httpq,LocalCoursService,LocalEnseignantService) {

        $scope.mps='dist/mps.json';
        $scope.file=false;
        $scope.choixExtension=false;
        $scope.critere=0;
        $scope.extensions=[".pdf", ".docx", ".java"];
        //$scope.evaluation.sections=localStorageService.get("sections");

        $('input[type="checkbox"]').on('change', function() {
            $('input[name="' + this.name + '"]').not(this).prop('checked', false);
        });

        $('.dropdown').on( 'click', '.dropdown-menu li a', function() {
            var target = $(this).html();

            //Adds active class to selected item
            $(this).parents('.dropdown-menu').find('li').removeClass('active');
            $(this).parent('li').addClass('active');

            //Displays selected text on dropdown-toggle button
            $(this).parents('.dropdown').find('.dropdown-toggle').html(target + ' <span class="caret"></span>');
        });


        $scope.evaluation={
            "sections":[
                {
                    "id":1,
                    "nom":"Ma première section",
                    "points":"5",
                    "typeRendu":"fichier",
                    "extension":null,
                    "criteres":[
                        {
                            "position":1,
                            "type":"commentaire",
                            "description":"Commentez",
                        },
                        {
                            "position":2,
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

        }
    }]);