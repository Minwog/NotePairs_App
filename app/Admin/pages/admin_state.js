(function() {
    angular.module('NotePairApp')

        .config(
            ['$stateProvider', function ($stateProvider) {
                $stateProvider.state('admin', {
                    url:'/admin',
                    controller:'adminController',
                    views:{
                        'layout':{
                            templateUrl:'app/Admin/pages/admin.html',
                            controller:'PaginationController'
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
                                templateUrl:'app/Admin/pages/eleves/eleves_add.html',
                                controller:'ElevesAddController'
                            }
                        }
                    })
                    .state('admin.students.update',{
                        parent:'admin',
                        url:'/students/:id',
                        views:{
                            'content':{
                                templateUrl:'app/Admin/pages/eleves/eleve_update.html',
                                controller:'UpdateEleveController'
                            }
                        }
                    })

                    .state('admin.enseignants',{
                        parent:'admin',
                        url:'/enseignant',
                        views:{
                            'content':{
                                templateUrl:'app/Admin/pages/enseignants/enseignants.html',
                                controller:'EnseignantsController'
                             }
                         }
                    })
                    .state('admin.enseignants.add',{
                        parent:'admin',
                        url:'/enseignant/new',
                        views:{
                            'content':{
                                templateUrl:'app/Admin/pages/enseignants/enseignants_add.html',
                                controller:'AddEnseignantsController'
                            }
                        }
                    })
                    .state('admin.enseignants.update',{
                        parent:'admin',
                        url:'/enseignant/:id',
                        views:{
                            'content':{
                                templateUrl:'app/Admin/pages/enseignants/enseignants_update.html',
                                controller:'UpdateEnseignantsController'
                            }
                        }
                    })
                    .state('admin.cours',{
                        parent:'admin',
                        url:'/cours',
                        views:{
                            'content':{
                                templateUrl:"app/Admin/pages/cours/cours.html",
                                controller:'CoursController'
                            }
                        }
                    })

                    .state('admin.cours.add',{
                        parent:'admin',
                        url:'/cours/new',
                        views:{
                            'content':{
                                templateUrl:"app/Admin/pages/cours/cours_add.html",
                                controller:'AddCoursController'
                            }
                        }
                    })

                    .state('admin.cours.update', {
                        parent:'admin',
                        url:'/cours/update/:id',
                        views:{
                            'content':{
                                templateUrl:"app/Admin/pages/cours/cours_update.html",
                                controller: 'UpdateCoursController'
                            }
                        }
                    })

                    .state('admin.cours.view',{
                        parent:'admin',
                        url:'/cours/view/:id',
                        views:{
                            'content':{
                                templateUrl:"app/Admin/pages/cours/cours_view.html",
                                controller:'UpdateCoursController'
                            }
                        }
                    })

                    .state('admin.cours.addUser', {
                        parent:'admin',
                        url:'/cours/:id/addUser/:role',
                        views:{
                            'content':{
                                templateUrl:"app/Admin/pages/cours/cours_add_User.html",
                                controller: 'AddUserCoursController'
                            }
                        }
                    })

                    .state('admin.groupes',{
                        parent:'admin',
                        url:'/groupes',
                        views:{
                            'content':{
                                templateUrl:"app/Admin/pages/groupe/groupes.html",
                                controller:'GroupesController'
                            }
                        }
                    })

                    .state('admin.groupes.add',{
                        parent:'admin',
                        url:'/groupes/new',
                        views: {
                            'content': {
                                templateUrl: "app/Admin/pages/groupe/groupes_add.html",
                                controller: 'AddGroupesController'
                            }
                        }

                    })

                    .state('admin.groupes.update',{
                        parent:'admin',
                        url:'/groupes/:id',
                        views:{
                            content:{
                                templateUrl:'app/Admin/pages/groupe/groupes_update.html',
                                controller:'UpdateGroupesController'
                            }
                        }
                    })



            }]);
})();