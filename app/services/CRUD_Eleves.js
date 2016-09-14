angular.module('NotePairApp')
    .factory('CRUD_Eleves', function($resource) {
    return $resource('/resources/json/eleves.json');
});