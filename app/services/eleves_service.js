angular.module('NotePairApp')
    .factory('ElevesService', ['$resource',function($resource) {
    return $resource('/resources/json/eleves.json',{},{
        'query': {method: 'GET', isArray: true},
        'get': {
            method: 'GET'
        },
        'update': {method: 'PUT'}
    });
    }])

    .service('alerteService',['$window',function ($window) {
    this.showPopup = function (message) {
        return $window.confirm(message);
    }
}]);