angular.module('NotePairApp')
    .controller('EnseignantController',['$scope','$state','$stateParams', 'httpq',  function ($scope,$state,$stateParams,httpq) {

        $scope.enseignantCo =
        {
            "enseignant_id": "57dfeaf1e8f757d807dcd035",
            "user_id": "57dfeaf1ab1de26fd76523ba",
            "prenom": "Ulli",
            "nom": "Baker",
            "email": "ullibaker@gmail.com",
            "cours": [
                {
                    "nom":"Physique quantique",
                    "categorie":"Physique",
                    "evaluations":
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
                                "date_rendu": "25/12/2016",
                                "date_fin_correction": "27/12/2016",
                                "description":"Lorem ipsum blablabla",
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
                        ]
                },
                {
                    "nom":"Composants à semiconducteurs",
                    "categorie":"Electronique"
                }
            ],
            "avatar":"../resources/images/avatar.jpg"
        }

    }])