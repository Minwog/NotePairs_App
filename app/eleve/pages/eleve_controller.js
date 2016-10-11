angular.module('NotePairApp')
    .controller('EleveController',['$scope','$state','$stateParams', 'httpq', 'textAngularManager', function ($scope,$state,$stateParams,httpq,textAngularManager) {

        $scope.version = textAngularManager.getVersion();
        $scope.versionNumber = $scope.version.substring(1);
        $scope.disabled = false;
        $scope.tab=0;

        $scope.eleveCo =
        {
            "role_id":"eleve",
            "user_id": "57dfeaf1ab1de26fd76523ba",
            "prenom": "Cross",
            "nom": "Cazier",
            "email": "cross@test.com",
            "cours": [
                "Physique quantique",
                "Representation analytique des signaux et systemes",
                "Composants à semiconducteurs"
            ],
            "avatar":"../resources/images/avatar.jpg",
            "devoirsARendre": [
                {
                    "id":1,
                    "date_rendu":"25/12/2016",
                    "user_id":1,
                    "cours":
                        {
                            "nom":"Physique quantique esxdrcgvbhgv fcdxesrd tcfygubhi",
                            "image":"../resources/images/robert.jpg"
                        }
                },
                {
                    "id":2,
                    "date_rendu":"26/12/2016",
                    "note":0,
                    "user_id":1,
                    "cours":
                        {
                            "nom":"Introduction à Bootstrap",
                            "image":"../resources/images/robert.jpg"
                        }
                }
            ],
            "evalsAFaire":[
                {
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
                    "id":2,
                    "date_rendu":"25/12/2016",
                    "date_fin_correction":"27/12/2016",
                    "note":0,
                    "user_id":2,
                    "fichier":"../resources/cvAurorev3.pdf",
                    "cours":
                    {
                        "nom":"Introduction à Bootstrap 2",
                        "image":"../resources/images/robert.jpg"
                    },
                    "copies":
                    {
                        "id":1
                    }
                }

            ]
        }

        $scope.copie=
        {
            "id":1,
            "date_rendu":"25/12/2016",
            "note":0,
            "user_id":1,
            "fichier":"../resources/cvAurorev3.pdf",
            "sections":[
                {
                    "id": 1,
                    "titre": "Ma première section",
                    "description": "Ceci est ma première section",
                    "enonce": "../resources/cvAurorev3.pdf",
                    "ordre": "1",
                    "points": "5",
                    "type_rendu": "fichier",
                    "evaluation_id": 1,
                    "criteres":[
                        {
                            "position":1,
                            "type":"commentaire",
                            "description":"Commentez",
                            "ordre":1,
                            "id":1
                        },
                        {
                            "position":2,
                            "type":"condition",
                            "description":"Conditionnez",
                            "points":2,
                            "precision":0.2,
                            "ordre":2,
                            "id":2
                        },
                        {
                            "position":3,
                            "type":"jugement",
                            "description":"Commentez",
                            "ordre":3,
                            "id":3
                        }

                    ]
                },
                {
                    "id":2,
                    "titre":"Ma deuxième section",
                    "description":"Ceci est ma deuxième section",
                    "enonce":"contenu",
                    "ordre":"2",
                    "points":"5",
                    "type_rendu":"texte",
                    "extension":"null",
                    "evaluation_id":1,
                    "criteres":[
                        {
                            "position":1,
                            "type":"condition",
                            "description":"Turbulentos salus dilato in cibo eum eum acueret praedicto et. Lorem ipsum.",
                            "points":2,
                            "ordre":1,
                            "id":1
                        },
                        {
                            "position":2,
                            "type":"jugement",
                            "description":"Turbulentos salus dilato in cibo eum eum acueret praedicto et.",
                            "points":2,
                            "precision":0.2,
                            "ordre":2,
                            "id":2
                        }

                    ]
                },
                {
                    "id":3,
                    "titre":"Ma troisième section",
                    "description":"Numquam si bene ideo paeniteat exoptatus tamquam tamquam bona mentiri multa sic observantem nunc observantem.",
                    "enonce":"contenu",
                    "ordre":"3",
                    "points":"5",
                    "type_rendu":"fichier",
                    "evaluation_id":1,
                    "criteres":[
                        {
                            "position":1,
                            "type":"commentaire",
                            "description":"Commentez",
                            "ordre":1,
                            "id":1,
                            "points":3,
                        },
                        {
                            "position":2,
                            "type":"jugement",
                            "description":"Igitur pro praevenirent flexuosas arbitrabantur verticosi fluvii cum adposita transgressi summitates ut cum alti motus.",
                            "points":2,
                            "precision":0.2,
                            "ordre":2,
                            "id":2
                        }

                    ]
                },
            ]
        }

        $scope.setTab=function(i){
            $scope.tab=i;
        }

        $scope.isTab=function(i){
            return ($scope.tab==i);
        }

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