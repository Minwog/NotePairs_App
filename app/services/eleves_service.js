angular.module('NotePairApp')
        .factory('UserService', ['$resource', '$http', '$stateParams','$q', function ($resource, $http, $stateParams,$q) {

            var resource = $resource('http://localhost:8000/api/users/:id', {}, {

                'query': {
                    method: 'GET', isArray: true
                },
                'get': {
                    method: 'GET',
                    transformResponse: function (data) {
                        if (data) {
                            data = angular.fromJson(data);
                        }
                        return data;
                    }
                },
                'update': {
                    method: 'PUT'
                }
            });

            function ByRole(id) {
                var deferred=$q.defer();
                $http.get('http://localhost:8000/api/userbyrole/' + id).success(
                    function(data) {
                        deferred.resolve(data);
                        console.log(data);
                    }
                );
                return deferred.promise;


            };

            function getCours(id){
                var deferred=$q.defer();
                $http.get('http://localhost:8000/api/users/'+id+'/cours/all').success(
                    function (data) {
                        deferred.resolve(data);
                        console.log(data);
                    }
                )

                return deferred.promise
            }


            return {
                'query': resource.query,
                'save': resource.save,
                'update': resource.update,
                'get': resource.get,
                'delete': resource.delete,
                'getByRole': ByRole,
                'getCours':getCours
            };

        }])

        .service('alerteService', ['$window', function ($window) {
            this.showPopup = function (message) {
                return $window.confirm(message);
            }
        }])

        // le service pour aller chercher les données en mode démo dans le localstorage
        .factory('LocalElevesService', ['$q', 'ElevesService', function ($q, ElevesService) {

            var _value;

            var service = {
                'query': value,
                'save': save,
                'update': update,
                'get': trouver,
                'delete': delet
            };

            function save(data) {
                _value.push(data);
            }


            function update(data) {

                findById(data, function (eleve) {
                    console.log(eleve);
                    _value[eleve.index] = data;
                });

            }

            function delet(id) {
                findById(id, function (eleve) {
                    console.log(eleve.index);
                    _value.splice(eleve.index, 1)
                })

            }

            function trouver(id) {
                var deferred = $q.defer();
                findById(id, function (eleve) {
                    console.log(eleve);
                    deferred.resolve(eleve.eleve)
                })
                return deferred.promise
            };

            function findById(id, callback) {
                console.log('debut findById');
                var done = false;
                var eleve;
                var index;
                for (var i = 0; i < _value.length; i++) {
                    if (_value[i]['eleves_id'] == id) {
                        eleve = _value[i];
                        index = i;
                        done = true;
                    }
                }
                if (done) {

                    callback({'eleve': eleve, 'index': index});
                }
            }

            function value() {
                var deferred = $q.defer();

                // check and see if we have retrieved the  data.
                // if we have, reuse it by immediately resolving
                if (!_value) {
                    ElevesService.query().$promise
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


            return service

        }]);


