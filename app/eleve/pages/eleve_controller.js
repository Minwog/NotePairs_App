angular.module('NotePairApp')
    .controller('EleveController',['$scope','$state','$stateParams', 'httpq', 'textAngularManager','ElevesService', function ($scope,$state,$stateParams,httpq,textAngularManager,ElevesService) {

        $scope.version = textAngularManager.getVersion();
        $scope.versionNumber = $scope.version.substring(1);
        $scope.disabled = false;
        $scope.tab=0;

        $scope.eleveCo = ElevesService.get({id:1});

        ElevesService.getCours(1).then(function(data){
            $scope.MesCours=data;
        });
/*
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
                            "description":"Commentez",
                            "points":2,
                            "ordre":1,
                            "id":1
                        },
                        {
                            "position":2,
                            "type":"jugement",
                            "description":"Jugez",
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
                    "description":"Ceci est ma troisième section",
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
                            "description":"Jugez",
                            "points":2,
                            "precision":0.2,
                            "ordre":2,
                            "id":2
                        }

                    ]
                },
            ]
        }
*/
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