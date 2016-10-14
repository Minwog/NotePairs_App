angular.module('NotePairApp')
    .controller('EvaluationsController',['$route','$scope','$state','$stateParams', 'httpq', 'LocalCoursService', 'LocalEnseignantService', 'LocalEvaluationsService', 'UserService', 'EvaluationsService', 'localStorageService', function ($route,$scope,$state,$stateParams,httpq,LocalCoursService,LocalEnseignantService,localEvaluationsService,UserService,EvaluationsService, LocalStorageService) {
        $scope.mps='dist/mps.json';
        $scope.newEval=[];
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

        $scope.getSections=function(id){
            EvaluationsService.getSections(id)
                .then(function (data) {
                    $scope.sectionList=data;
                    console.log($scope.sectionList);
                    LocalStorageService.set('sectionList', $scope.sectionList);
                    console.log($scope.sectionList);
                });
        }



        /*$scope.getCriteres=function(section){
            EvaluationsService.getCriteres(section.id)
                .then(function (data) {
                    section.critereList=data;
                    console.log(section.critereList);
                });
            console.log(sectionList);
        }*/

        $scope.coursList=UserService.getCours($scope.enseignant.id);

        if(LocalStorageService.get('eval')){
            $scope.newEval=JSON.parse(LocalStorageService.get('eval'));
            console.log($scope.newEval);
            $scope.getSections($scope.newEval.id);
        } else {
            $scope.newEval={
                'enseignant_id':1,
                'cours_id':1,
                'mode_calcul':1,
                'nom':'aa',
                'date_rendu':'',
                'date_fin_correction':'',
                'nombreEval':''
            };
            console.log($scope.newEval);
        }


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

        $scope.createEval=function(){
            $scope.newEval.enseignant_id=1;
            $scope.newEval.cours_id=1;
            console.log($scope.newEval);
            EvaluationsService.save($scope.newEval)
                .$promise.then(function(data) {
                    $scope.newEval=data;
                    console.log(data);
                    LocalStorageService.set('eval', JSON.stringify($scope.newEval));
            });
            console.log($scope.newEval);
        }

        $scope.addSection = function (section) {
            if($scope.sectionList!=null){
                section.ordre=$scope.sectionList.length+1;
            } else {
                section.ordre=1;
            }
            console.log($scope.newEval.id);
            EvaluationsService.createSection($scope.newEval.id, section)
                .then(function(data) {
                    console.log($scope.newEval.id);
                    $scope.sectionList=$scope.getSections($scope.newEval.id);
                    LocalStorageService.set('sectionList', $scope.sectionList);
                    console.log($scope.sectionList)
                });
        }

        $scope.deleteSection=function(id){
            EvaluationsService.deleteSection(id)
                .then(function (data) {
                    console.log($scope.sectionList);
                    LocalStorageService.set('sectionList', $scope.sectionList);
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

        /*$scope.sectionUp=function(pos, data){
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
        }*/



    }]);