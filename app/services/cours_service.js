/**
 * Created by aurore on 20/09/2016.
 */
angular.module('NotePairApp')
    .factory('CoursService', ['$resource',function($resource) {
        return $resource('/resources/json/cours.json',{},{
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
    }])

    .service('alerteService',['$window',function ($window) {
        this.showPopup = function (message) {
            return $window.confirm(message);
        }
    }])

    // le service pour aller chercher les données en mode démo dans le localstorage
    .factory('LocalCoursService',['$q','CoursService',function ($q,CoursService) {

        var _value;

        var service = {
            'query': value,
            'save': save,
            'update': update,
            'get': trouver,
            'delete':delet,
            'deleteTeacher':deleteTeacher
        };

        function save(data) {
            _value.push(data);
        }


        function update(data) {

            findById(data, function (cours) {
                console.log(cours);
                _value[cours.index] = data;
            });

        }

        function delet(id) {
            findById(id,function (cours) {
                console.log(cours.index);
                _value.splice(cours.index,1)
            })

        }

        function trouver(id) {
            var deferred=$q.defer();
            findById(id, function (cours) {
                console.log(cours);
                deferred.resolve(cours.cours)
            })
            return deferred.promise
        };

        function findById(id, callback) {
            console.log('debut findById');
            var done = false;
            var cours;
            var index;
            for (var i = 0; i < _value.length; i++) {
                if (_value[i]['id'] == id) {
                    cours = _value[i];
                    index = i;
                    done = true;
                }
            }
            if (done) {

                callback({'cours': cours, 'index': index});
            }
        }

        function value(){
            var deferred = $q.defer();

            // check and see if we have retrieved the  data.
            // if we have, reuse it by immediately resolving
            if (!_value) {
                CoursService.query().$promise
                    .then(function (data) {
                            _value = data;
                            deferred.resolve(data);
                            console.log('wsh')
                        }
                    )
            } else {
                deferred.resolve(_value)
                console.log('fzezfze')
            }
            return deferred.promise
        }

        function deleteTeacher(id, idEnseignant){

        }


        return service

    }]);

