angular.module('NotePairApp')
    .factory('EnseignantsService', ['$resource',function($resource) {
        return $resource('/resources/json/enseignants.json',{},{
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

        .factory('LocalEnseignantService',['$q','EnseignantsService',function ($q,EnseignantsService) {

            var _Enseignantsvalue;

            var service = {
                'query': value,
                'save': save,
                'update': update,
                'get': trouver,
                'delete':delet
            };

            function save(data) {
                _Enseignantsvalue.push(data);
            }


            function update(data) {

                findById(data, function (eleve) {
                    console.log(eleve);
                    _Enseignantsvalue[eleve.index] = data;
                });

            }

            function delet(id) {
                findById(id,function (eleve) {
                    console.log(eleve.index);
                    _Enseignantsvalue.splice(eleve.index,1)
                })

            }


            function trouver(id) {
                var deferred=$q.defer();
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
                for (var i = 0; i < _Enseignantsvalue.length; i++) {
                    console.log(typeof id)
                    if (_Enseignantsvalue[i].enseignant_id.valueOf()==id.valueOf()) {
                        eleve = _Enseignantsvalue[i];
                        index = i;
                        done = true;
                    }
                }
                if (done) {
                    console.log('findById');
                    callback({'eleve': eleve, 'index': index});
                }
            }

            function value(){
                var deferred = $q.defer();

                // check and see if we have retrieved the  data.
                // if we have, reuse it by immediately resolving
                if (!_Enseignantsvalue) {
                    EnseignantsService.query().$promise
                        .then(function (data) {
                                _Enseignantsvalue = data;
                                deferred.resolve(data);
                                console.log('wsh')
                            }
                        )
                } else {
                    deferred.resolve(_Enseignantsvalue)
                    console.log('fzezfze')
                }
                return deferred.promise
            }


            return service

        }]);