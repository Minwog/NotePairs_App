angular.module('NotePairApp')
    .controller('CoursController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService', 'httpq', function ($scope,$state,$stateParams, alerteService, ElevesService, httpq) {
        httpq.get("resources/json/cours.json")
            .then(function(data) {
                $scope.coursList = data;
            });

        httpq.get("resources/json/eleves.json")
            .then(function(data) {
                $scope.ElevesList = data;
            });

        httpq.get("resources/json/enseignants.json")
            .then(function(data) {
                $scope.EnseignantsList = data;
            });

        //---- Controle de la page

        $scope.goToAdd=function () {
            $state.go('admin.cours.add')
        };

        $scope.goToUpdate=function (id) {
            $state.go('admin.cours.update',{id:id})
        };

        $scope.goToDelete=function(id){
            $state.go('admin.cours.delete',{id:id})

            // A faire

        }

        $scope.goToView=function (id) {
            $state.go('admin.cours.view',{id:id})
        };

        $scope.goToAddTeacher=function(id){ // id du cours
            $state.go('admin.cours.addTeacher', {id:id})
        };

        $scope.goToDeleteTeacher=function(id, idEnseignant){

            //A faire

        }

        $scope.goToAddEleve=function(id){
            $state.go('admin.cours.addEleve', {id:id})

            //A faire

        }

        $scope.goToDeleteEleve=function(id, idEleve){

            //A faire

        }

        //----------- fonctions utiles de recherche ( démo/localstorage)

        $scope.cours=  {
            "_id":1,
            "intitule":"Economie d'entreprise",
            "section":"Economie",
            "reference": "A345590718678",
            "description": "Donner une définition de l’entreprise est difficile. D’un point de vue substantiel il est possible de faire la liste des personnes morales ou physiques généralement considérées comme des entreprises. D’un point de vue conceptuel il existe des approches théoriques de l’entreprise mais leur diversité pose problème. Le plus simple est sans doute de respecter une démarche traditionnelle consistant à présenter l’entreprise à partir de ses fonctions économiques.",
            "ouvert":true,
            "enseignants":[
                {
                    "Nom": "Cox",
                    "Prenom": "Rios",
                    "username": "CoxRios",
                    "email":"coxrios@coxrios.com",
                    "enseignants_id":"1"
                },
                {
                    "Nom": "Myra",
                    "Prenom": "Ashley",
                    "username": "MyraAshley",
                    "email":"myraashley@coxrios.com",
                    "enseignants_id":"2"
                },
                {
                    "Nom": "Love",
                    "Prenom": "Bobby",
                    "username": "bobbylove",
                    "email":"bobbylove@coxrios.com",
                    "enseignants_id":"3"
                }
            ],
            "eleves":[
                {
                    "Nom": "Cox",
                    "Prenom": "Rios",
                    "username": "CoxRios",
                    "email": "coxrios@coxrios.com",
                    "eleves_id": "1"
                },
                {
                    "Nom": "Love",
                    "Prenom": "Bobby",
                    "username": "bobbylove",
                    "email":"bobbylove@coxrios.com",
                    "eleves_id":"3"
                }
            ]
        };

    }]);