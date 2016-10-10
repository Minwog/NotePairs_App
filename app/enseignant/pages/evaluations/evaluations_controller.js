angular.module('NotePairApp')
    .controller('EvaluationsController',['$scope','$state','$stateParams', 'httpq', 'LocalCoursService', 'LocalEnseignantService', 'LocalEvaluationsService', function ($scope,$state,$stateParams,httpq,LocalCoursService,LocalEnseignantService,LocalEvaluationsService) {

        $scope.mps='dist/mps.json';
        $scope.file=false;
        $scope.choixExtension=false;
        $scope.critere=0;
        $scope.extensions=[".pdf", ".docx", ".java"];
        $scope.correction_groupe=false;


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

        $scope.evaluationsEnCours=
            [
                {
                    "nom":"eval1",
                    "id":1,
                    "date_rendu":"25/12/2016",
                    "date_fin_correction":"26/12/2016",
                    "note":0,
                    "user_id":3,
                    "fichier":"../resources/cvAurorev3.pdf",
                    "cours":
                    {
                        "nom":"Introduction à Bootstrap",
                        "image":"../resources/images/robert.jpg"
                    },
                    "copies": [
                        {
                            id: "1"
                        },
                        {
                            id: "2"
                        },
                        {
                            id: "3"
                        },
                    ]
                },
                {
                    "nom":"eval2",
                    "id": 2,
                    "date_rendu": "25/12/2016",
                    "date_fin_correction": "27/12/2016",
                    "note": 0,
                    "user_id": 2,
                    "fichier": "../resources/cvAurorev3.pdf",
                    "cours": {
                        "nom": "Introduction à Bootstrap 2",
                        "image": "../resources/images/robert.jpg"
                    },
                    "copies": {
                        "id": 1
                    }
                }
            ];

        LocalEvaluationsService.query().then(function (data) {
            $scope.sectionList=data;
        });

        $scope.ElevesList=[
            {
                "Nom":"Palmier",
                "Prenom":"Marie",
                "ElevesACorriger":[
                    {
                        "Nom":"Toupi",
                        "Prenom":"Julien"
                    }
                ]
            },
            {
                "Nom":"Toupi",
                "Prenom":"Julien",
                "ElevesACorriger":[
                    {
                        "Nom":"Palmier",
                        "Prenom":"Marie"
                    }
                ]
            },
            {
                "Nom":"Nectar",
                "Prenom":"Amandine",
                "ElevesACorriger":[
                    {
                        "Nom":"Toupi",
                        "Prenom":"Julien"
                    }
                ]
            },
            {
                "Nom":"Ramou",
                "Prenom":"Gauthier",
                "ElevesACorriger":[
                    {
                        "Nom":"Nectar",
                        "Prenom":"Amandine",
                    }
                ]
            }

        ]

        $scope.GroupesList=[
            {
                "nom": "Groupe n°1",
                "eleves": [
                    {
                        "Nom": "Palmier",
                        "Prenom": "Marie"
                    },
                    {
                        "Nom": "Toupi",
                        "Prenom": "Julien"
                    }
                ],
                "GroupesACorriger":[
                    {
                        "nom": "Groupe n°2",
                        "eleves": [
                            {
                                "Nom": "Palmier",
                                "Prenom": "Marie"
                            },
                            {
                                "Nom": "Toupi",
                                "Prenom": "Julien"
                            },
                            {
                                "Nom":"Nectar",
                                "Prenom":"Amandine"
                            }
                        ]
                    }
                ]
            },
            {
                "nom": "Groupe n°2",
                "eleves": [
                    {
                        "Nom": "Palmier",
                        "Prenom": "Marie"
                    },
                    {
                        "Nom": "Toupi",
                        "Prenom": "Julien"
                    },
                    {
                        "Nom":"Nectar",
                        "Prenom":"Amandine"
                    }
                ]
            },
            {
                "nom": "Groupe n°3",
                "eleves": [
                    {
                        "Nom":"Nectar",
                        "Prenom":"Amandine"
                    },
                    {
                        "Nom":"Ramou",
                        "Prenom":"Gauthier"
                    }
                ]
            }
        ]

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
            $scope.newSection.ordre = $scope.sectionList.length+1;
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
                    $scope.newCritere.ordre = $scope.sectionList[i].criteres.length+1;
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