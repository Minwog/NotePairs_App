angular.module('NotePairApp')

.config(
    ['$stateProvider',function ($stateProvider){
        $stateProvider
            .state('home', {
                url: '/',
                templateUrl:'index.html',
                controller:'MainController'
            })
    }]
);