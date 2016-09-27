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

                .state('eleve.correction',{
                    parent:'eleve',
                    url:'/correction/:id',
                    views:{
                        'content':{
                            templateUrl:'app/eleve/pages/correction/correction.html',
                            controller:'CorrectionController'
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
        }])