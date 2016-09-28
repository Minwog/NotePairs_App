angular.module('NotePairApp')
    .controller('EvaluationsController',['$scope','$state','$stateParams', 'httpq', 'LocalCoursService', 'LocalEnseignantService', 'LocalEvaluationsService', function ($scope,$state,$stateParams,httpq,LocalCoursService,LocalEnseignantService,LocalEvaluationsService) {

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

        $scope.enseignant = {
            "cours":[
                "azdazca",
                "zeafvfds"
            ]
        }

        /*
        $scope.evaluation.sections = [
        {
            "id":1,
            "ordre":1,
            "nom":"Ma première section",
            "points":"5",
            "typeRendu":"fichier pdf",
            "extension":null,
            "criteres":[
            {
                "ordre":1,
                "type":"commentaire",
                "description":"Commentez",
            },
            {
                "ordre":2,
                "type":"jugement",
                "description":"Jugez",
                "points":2,
                "precision":0.2
            }
        ]
        },
        {
            "id":2,
            "ordre":2,
            "nom":"Ma deuxième section",
            "points":"5",
            "typeRendu":"lien",
            "extension":null,
            "criteres":[
            {
                "ordre":1,
                "type":"commentaire",
                "description":"Commentez",
            },
            {
                "ordre":2,
                "type":"jugement",
                "description":"Jugez",
                "points":2,
                "precision":0.2
            }
        ]
        },
        {
            "id":3,
            "ordre":3,
            "nom":"Ma troisième section",
            "points":"5",
            "typeRendu":"fichier matlab",
            "extension":null,
            "criteres":[
            {
                "ordre":1,
                "type":"commentaire",
                "description":"Commentez",
            },
            {
                "ordre":2,
                "type":"jugement",
                "description":"Jugez",
                "points":2,
                "precision":0.2
            }
        ]
        }
        ]
*/

        LocalEvaluationsService.query().then(function (data) {
            $scope.sectionList=data;
        });

        $scope.newSection={
            'id':'',
            'titre':'',
            'description':'',
            'enonce':'',
            'ordre':'',
            'points':'',
            'type_rendu':'',
            'evaluation_id':''
        };

//--- Methode add pour ajouter un Eleve à la liste ---//
        $scope.addSection = function () {
            $scope.newSection.ordre = $scope.sectionList.length;
            console.log($scope.sectionList[1])
            LocalEvaluationsService.save($scope.newSection);
        };

        $scope.panelColor = ["panel-warning", "panel-info", "panel-success", "panel-danger" ]

        $scope.setFile=function(i){
            $scope.file=i;
        }

        $scope.choisirExtension=function(i){
            $scope.choixExtension=i;
        }

        $scope.setCritereType=function(i){
            $scope.critere=i;
        }

        $scope.newCritere = {
            "id":12
        }
        $scope.addCritere=function (sec) {
            for(var i = 0; i < $scope.sectionList.length; i++){
                if($scope.sectionList[i].id == sec.id){
                    $scope.sectionList[i].criteres.push($scope.newCritere)
                    //$scope.sectionList[i].criteres.push($scope.newCritere);
                    //LocalEvaluationsService.save($scope.sectionList);
                    console.log($scope.sectionList[i])
                    break;
                }
            }

        }

        $scope.sectionUp=function(pos, data){
            for(var i=data.length-1; i >= 0; i--){
                if(data[i].ordre == pos && data[i].ordre > 1){
                    data[i].ordre = data[i].ordre-1;
                }
                else if(data[i].ordre == pos-1){
                    data[i].ordre = data[i].ordre+1;
                }
            }
        }

        $scope.sectionDown=function(pos, data){
            for(var i=0; i < data.length; i++){
                if(data[i].ordre == pos && data[i].ordre < data.length){
                    data[i].ordre = data[i].ordre+1;
                }
                else if(data[i].ordre == pos+1){
                    data[i].ordre = data[i].ordre-1;
                }
            }
        }
    }]);