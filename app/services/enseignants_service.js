angular.module('NotePairApp')
    .factory('EnseignantsService', ['$resource',function($resource) {
        return $resource('/resources/json/enseignants.json',{},{
            update: {
                method:'PUT'
            }
        });
    }).service('alerteService',function ($window) {
    this.showPopup = function (message) {
        return $window.confirm(message);
    }
}]);