angular.module('NotePairApp')
    .factory('CategorieService', ['$resource', '$http', '$stateParams','$q', function ($resource, $http, $stateParams,$q) {
        var resource= $resource('http://localhost:8000/api/categories/:id',{},{
            'query': {method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': {method: 'PUT'}
        });

        return{
            'query': resource.query,
            'save': resource.save,
            'update': resource.update,
            'get': resource.get,
            'delete': resource.delete
        }


    }])