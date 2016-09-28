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
                    "position":1,
                    "nom":"Ma première section",
                    "points":"5",
                    "typeRendu":"fichier pdf",
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
                },
                {
                    "id":2,
                    "position":2,
                    "nom":"Ma deuxième section",
                    "points":"5",
                    "typeRendu":"lien",
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
                },
                {
                    "id":3,
                    "position":3,
                    "nom":"Ma troisième section",
                    "points":"5",
                    "typeRendu":"fichier matlab",
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

        $scope.panelColor = ["panel-info", "panel-warning", "panel-success", "panel-danger" ]

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
        
        $scope.createCritere=function (id) {

        }

        $scope.sectionUp=function(pos, data){
            for(var i=data.length-1; i >= 0; i--){
                if(data[i].position == pos && data[i].position > 1){
                    data[i].position = data[i].position-1;
                }
                else if(data[i].position == pos-1){
                    data[i].position = data[i].position+1;
                }
            }
        }

        $scope.sectionDown=function(pos, data){
            for(var i=0; i < data.length; i++){
                if(data[i].position == pos && data[i].position < data.length){
                    data[i].position = data[i].position+1;
                }
                else if(data[i].position == pos+1){
                    data[i].position = data[i].position-1;
                }
            }
        }
    }]);