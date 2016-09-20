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
                        'content@admin':{
                            templateUrl:'app/enseignant/pages/main/main.html'
                        }
                    }
                })

                    .state('enseignant.evaluations',{
                        parent:'enseignant',
                        url:'/evaluations',
                        views:{
                            'content':{
                                templateUrl:'app/enseignant/pages/evaluations/evaluations.html'
                            }
                        }
                    })



            }]);
})();