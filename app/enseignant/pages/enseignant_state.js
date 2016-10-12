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

                    .state('enseignant.createEvaluation.etape2',{
                        parent:'enseignant',
                        url:'/evaluations_create2',
                        views:{
                            'content':{
                                templateUrl:'app/enseignant/pages/evaluations/evaluation-create2.html',
                                controller: 'EvaluationsController'
                            }
                        }
                    })

                    .state('enseignant.createEvaluation.etape3',{
                        parent:'enseignant',
                        url:'/evaluations_create3',
                        views:{
                            'content':{
                                templateUrl:'app/HighCharts/demo.html',
                                controller: 'HighChartsController'
                            }
                        }
                    })

                    .state('enseignant.pivot',{
                        parent:'enseignant',
                        url:'/pivot',
                        views:{
                            'content':{
                                templateUrl:'app/enseignant/pages/evaluations/pivottable.html',
                                controller: 'HighChartsController'
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

                    .state('enseignant.cours',{
                        parent:'enseignant',
                        url:'/cours',
                        views:{
                            'content':{
                                templateUrl:'app/enseignant/pages/cours/cours.html'
                            }
                        }
                    })

                        .state('enseignant.mesCours',{
                            parent:'enseignant',
                            url:'/cours',
                            views:{
                                'content':{
                                    templateUrl:'app/enseignant/pages/cours/mesCours.html'
                                }
                            }
                        })

                        .state('enseignant.cours.view',{
                            parent:'enseignant',
                            url:'/cours/view',
                            views:{
                                'content':{
                                    templateUrl:'app/enseignant/pages/cours/cours_view.html'
                                }
                            }
                        })



            }]);
})();