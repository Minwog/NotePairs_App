angular.module('NotePairApp')

    .config(
        ['$stateProvider', function ($stateProvider) {
            $stateProvider

                .state('eleve', {
                    url:'/eleve',
                    views:{
                        'layout':{
                            templateUrl:'app/eleve/pages/eleve.html',
                            controller:'EleveController'
                        },
                        'content@eleve':{
                            templateUrl:'app/eleve/pages/main/main.html'
                        }
                    }
                })


                .state('eleve.cours',{
                    parent:'eleve',
                    url:'/cours/:id',
                    views:{
                        'content':{
                            templateUrl:'app/eleve/pages/cours/cours.html',
                            controller:'CoursController'
                        }
                    }
                })

                .state('eleve.evaluations',{
                    parent:'eleve',
                    url:'/evaluations/:id',
                    views:{
                        'content':{
                            templateUrl:'app/eleve/pages/evaluations/evaluations.html',
                            controller:'EvaluationController'
                        }
                    }
                })

                .state('eleve.historique',{
                    parent:'eleve',
                    url:'/historique/:id',
                    views:{
                        'content':{
                            templateUrl:'app/eleve/pages/evaluations/historique.html',
                            controller:'EvaluationController'
                        }
                    }
                })

                .state('eleve.resultats',{
                    parent:'eleve',
                    url:'/resultats/:id',
                    views:{
                        'content':{
                            templateUrl:'app/eleve/pages/resultats/resultats.html',
                            controller:'ResultatController'
                        }
                    }
                })

                .state('eleve.groupes',{
                    parent:'eleve',
                    url:'/groupes/:id',
                    views:{
                        'content':{
                            templateUrl:'app/eleve/pages/groupes/groupes.html',
                            controller:'GroupeController'
                        }
                    }
                })
        }])