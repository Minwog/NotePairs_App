(function() {
    angular.module('NotePairApp')

        .config(
            ['$stateProvider', function ($stateProvider) {
                $stateProvider.state('enseignant', {
                    url:'/enseignant',
                    controller:'enseignantController',
                    views:{
                        'layout':{
                            templateUrl:'app/enseignant/pages/enseignant.html'
                        },
                        'content@enseignant':{
                            templateUrl:'app/enseignant/pages/main/main.html'
                        }
                    }
                })

                    .state('enseignant.evaluations',{
                        parent:'enseignant',
                        url:'/evaluations',
                        views:{
                            'content':{
                                templateUrl:'app/enseignant/pages/evaluations/evaluations.html',
                                controller: 'EvaluationsController'
                            }
                        }
                    })

                    .state('enseignant.createEvaluation',{
                        parent:'enseignant',
                        url:'/evaluations_create',
                        views:{
                            'content':{
                                templateUrl:'app/enseignant/pages/evaluations/evaluation-create.html',
                                controller: 'EvaluationsController'
                            }
                        }
                    })

                    .state('enseignant.voirEvaluation($id)',{
                        parent:'enseignant',
                        url:'/voir_evaluation/:id',
                        views:{
                            'content':{
                                templateUrl:'app/enseignant/pages/evaluations/voir.html',
                                controller: 'EvaluationsController'
                            }
                        }
                    })

                    .state('enseignant.diagrammeFiabilite',{
                        parent:'enseignant',
                        url:'/diagramme_fiabilite',
                        views:{
                            'content':{
                                templateUrl:'app/HighCharts/demo.html',
                                controller: 'HighChartsController'
                            }
                        }
                    })

                    .state('enseignant.mesCours',{
                        parent:'enseignant',
                        url:'/mes_cours',
                        views:{
                            'content':{
                                templateUrl:'app/enseignant/pages/cours/cours_view.html'
                            }
                        }
                    })

                        .state('enseignant.cours',{
                            parent:'enseignant',
                            url:'/cours/',
                            views:{
                                'content':{
                                    templateUrl:'app/enseignant/pages/cours/cours.html'
                                }
                            }
                        })



            }]);
})();