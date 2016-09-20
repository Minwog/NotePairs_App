angular.module('NotePairApp')
    .controller('CoursController',['$scope','$state','$stateParams', 'alerteService', 'ElevesService', 'httpq', function ($scope,$state,$stateParams, alerteService, ElevesService, httpq) {
        httpq.get("resources/json/cours.json")
            .then(function(data) {
                $scope.coursList = data;
            });

        //---- Control de la page

        $scope.goToAdd=function () {
            $state.go('admin.cours.add')
        };

        $scope.goToUpdate=function (id) {
            $state.go('admin.cours.update',{id:id})
        };

        $scope.goToView=function (id) {
            $state.go('admin.cours.view',{id:id})
        };

        $scope.goToAddTeacher=function(id){ // id du cours
            $state.go('admin.cours.addTeacher', {id:id})
        };
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
                    "id":"1"
                },
                {
                    "Nom": "Myra",
                    "Prenom": "Ashley",
                    "username": "MyraAshley",
                    "email":"myraashley@coxrios.com",
                    "id":"2"
                },
                {
                    "Nom": "Love",
                    "Prenom": "Bobby",
                    "username": "bobbylove",
                    "email":"bobbylove@coxrios.com",
                    "id":"3"
                }
            ],
            "eleves":[
                2
            ]
        };

        $scope.EnseignantsList=JSON.parse(localStorage.getItem("EnseignantsList"));
        if (!localStorage['EnseignantsList']){
            EnseignantsService.query().$promise.then(function (data) {
                localStorage.setItem('EnseignantsList', JSON.stringify(data));
            })
        }

    }]);