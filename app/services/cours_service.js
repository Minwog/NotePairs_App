angular.module('NotePairApp')
    .factory('CoursService', ['$resource', '$http', '$stateParams','$q', function ($resource, $http, $stateParams,$q) {
        var resource= $resource('http://localhost:8000/api/cours/:id',{},{
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

        function getEnseignant(id){
            var deferred=$q.defer();
            $http.get('http://localhost:8000/api/cours/'+id+'/users/all').success(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        }

        function getEval(id) {
            var deferred=$q.defer();
            $http.get('http://localhost:8000/api/evaluationsbycours/'+id).success(
                function (data) {
                    deferred.resolve(data);
                }
            )
            return deferred.promise;
        }

        function deleteUser(coursId,userId) {
            var deferred=$q.defer();
            $http.delete('http://localhost:8000/api/cours/'+coursId+'/users/'+userId).success(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        }

        function addUser(coursId,users) {
            var deferred=$q.defer();
            $http.post('http://localhost:8000/api/cours/'+coursId+'/users/add',users).success(
                function (data) {
                    deferred.resolve(data);
                }
            );
            return deferred.promise;
        }

        return{
            'query': resource.query,
            'save': resource.save,
            'update': resource.update,
            'get': resource.get,
            'delete': resource.delete,
            'getEnseignant':getEnseignant,
            'getEval':getEval,
            'deleteUser':deleteUser,
            'addUser':addUser
        }







    }])

    .service('alerteService',['$window',function ($window) {
        this.showPopup = function (message) {
            return $window.confirm(message);
        }
    }])

    // le service pour aller chercher les données en mode démo dans le localstorage
    .factory('LocalCoursService',['$q','CoursService',function ($q,CoursService) {

        var _Coursvalue;

        var service = {
            'query': value,
            'save': save,
            'update': update,
            'get': trouver,
            'delete':delet
        };

        function save(data) {
            _Coursvalue.push(data);
        }


        function update(data) {

            findById(data, function (Cours) {
                _Coursvalue[Cours.index] = data;
            });

        }

        function delet(id) {
            findById(id,function (Cours) {
                console.log(Cours.index);
                _Coursvalue.splice(Cours.index,1)
            })

        }

        function trouver(id) {
            var deferred=$q.defer();
            findById(id, function (Cours) {
                console.log(Cours);
                deferred.resolve(Cours.Cours)
            })
            return deferred.promise
        };

        function findById(id, callback) {
            console.log('debut findById');
            var done = false;
            var Cours;
            var index;
            for (var i = 0; i < _Coursvalue.length; i++) {
                if (_Coursvalue[i]['_id'] == id) {
                    Cours = _Coursvalue[i];
                    index = i;
                    done = true;
                }
            }
            if (done) {

                callback({'Cours': Cours, 'index': index});
            }
        }

        function value(){
            var deferred = $q.defer();

            // check and see if we have retrieved the  data.
            // if we have, reuse it by immediately resolving
            if (!_Coursvalue) {
                CoursService.query().$promise
                    .then(function (data) {
                            _Coursvalue = data;
                            deferred.resolve(data);
                            console.log('wsh')
                        }
                    )
            } else {
                deferred.resolve(_Coursvalue)
                console.log('fzezfze')
            }
            return deferred.promise
        }


        return service

    }]);

