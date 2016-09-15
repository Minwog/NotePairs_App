(function() {
    angular.module('NotePairApp')

        .config(
            ['$stateProvider', function ($stateProvider) {
                $stateProvider.state('admin', {
                    url:'/admin',
                    views:{
                        'layout':{
                            templateUrl:'app/Admin/pages/admin.html'
                        },
                        'content@admin':{
                            templateUrl:'app/Admin/pages/main/main.html'
                }
                    }
                })

                    .state('admin.students',{
                        parent:'admin',
                        url:'/students',
                        views:{
                            'content':{
                                templateUrl:'app/Admin/pages/eleves/eleves.html',
                                controller:'ElevesController'
                            }
                        }
                    })
                    .state('admin.students.add',{
                        parent:'admin',
                        url:'/students/new',
                        views:{
                            'content':{
                                templateUrl:'app/Admin/pages/eleves/eleves_add.html'
                            }
                        }
                    })

                    .state('admin.enseignants',{
                        parent:'admin',
                        url:'/enseignant',
                        views:{
                            'content':{
                                templateUrl:'app/Admin/pages/enseignants/enseignants.html',
                                controller:'EnseignantController'
                    }
                }
                    })

                    .state('admin.cours',{
                        parent:'admin',
                        url:'/cours',
                        views:{
                            'content':{
                                templateUrl:"app/Admin/pages/cours/cours.html"
                            }
                        }
                    })

            }]);
})();