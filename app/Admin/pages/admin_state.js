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

            }]);
})();