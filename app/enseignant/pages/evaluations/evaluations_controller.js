angular.module('NotePairApp')
    .controller('EvaluationsController',['$scope','$state','$stateParams', 'httpq', 'LocalCoursService', 'LocalEnseignantService', 'LocalEvaluationsService', 'UserService', 'EvaluationsService', function ($scope,$state,$stateParams,httpq,LocalCoursService,LocalEnseignantService,LocalEvaluationsService,UserService,EvaluationsService) {
        $scope.mps='dist/mps.json';
        $scope.file=false;
        $scope.critere=0;
        $scope.enseignant = {
            "cours":[
                "azdazca",
                "zeafvfds"
            ],
            "id":1
        }

        EvaluationsService.queryTypeRendu()
            .then(function(data){
            console.log(data);
            $scope.extensions=data;
        });


        $scope.coursList=UserService.getCours($scope.enseignant.id);


        $('input[type="checkbox"]').on('change', function() {
            $('input[name="' + this.name + '"]').not(this).prop('checked', false);
        });

        /*$scope.evaluationsEnCours=
            [
                {
                    "nom":"eval1",
                    "id":1,
                    "date_rendu":"25/12/2016",
                    "date_fin_correction":"26/12/2016",
                    "note":0,
                    "description":"Lorem ipsum blablabla",
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
                    "date_rendu": "27/12/2016",
                    "date_fin_correction": "30/12/2016",
                    "note": 0,
                    "user_id": 2,
                    "description":"Lorem ipsum blablabla",
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
        ]*/

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

        $scope.newEval={
            'enseignant_id':1,
            'cours_id':1,
            'mode_calcul':1,
            'nom':'aa',
            'date_rendu':'',
            'date_fin_correction':'',
            'nombreEval':'',
            'sectionList':[]
        };

        $scope.createEval=function(){
            console.log($scope.newEval);
            EvaluationsService.save($scope.newEval)
                .$promise.then(function(data) {
                $scope.newEval=data;
                console.log(data);
                $scope.newEval.sectionList=$scope.getSections($scope.newEval.id);
            });
        }

        $scope.getSections=function(id){
            EvaluationsService.getSections(id)
                .then(function (data) {
                    $scope.newEval.sectionList=data;
                    console.log($scope.newEval.sectionList);
                });
        }

        $scope.addSection = function (section) {
            $scope.newEval.sectionList=$scope.getSections($scope.newEval.id);
            if($scope.newEval.sectionList!=null){
                section.ordre=$scope.newEval.sectionList.length+1;
            } else {
                section.ordre=1;
            }
            EvaluationsService.createSection($scope.newEval.id, section)
                .then(function(data) {
                    newEval.sectionList=$scope.getSections($scope.newEval.id);
                });
        }

        $scope.deleteSection=function(id){
            EvaluationsService.deleteSection(id)
                .then(function (data) {
                    console.log($scope.newEval.sectionList);
                });
        }

        $scope.getTypeRendu=function(e){
            EvaluationsService.getTypeRendu(e)
                .then(function(data){
                    console.log(data);
                    $scope.newSection.type_rendu=data.extension;
                });
        }

        $scope.createTypeRendu=function(e){
            EvaluationsService.setTypeRendu(e)
                .then(function(data){
                console.log(data);
                $scope.newSection.type_rendu=data;
            });
        }

        $scope.getCriteres=function(section){
            EvaluationsService.getCriteres(section.id)
                .then(function (data) {
                    section.critereList=data;
                    console.log(section.critereList);
                });
        }

        $scope.addCritere=function(section, critere) {
            console.log(section.id);
            section.critereList = $scope.getCriteres(section);
            if ($scope.critereList != null) {
                critere.ordre = section.critereList.length + 1;
            } else {
                critere.ordre = 1;
            }
            EvaluationsService.createCritere(section.id, critere)
                .then(function(data) {
                    section.critereList=$scope.getCriteres(section);
                    console.log(section.critereList);
                });
        }

        $scope.deleteCritere=function(section){
            EvaluationsService.deleteCritere(section.id)
                .then(function(data) {
                    $scope.newCritere=data;
                    console.log(data);
                    section.critereList=$scope.getCriteres(section);
            });
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