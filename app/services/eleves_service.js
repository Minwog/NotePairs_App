angular.module('NotePairApp')
    .factory('ElevesService', ['$resource',function($resource) {
    return $resource('/resources/json/eleves.json',{},{
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
    .factory('LocalElevesService',['$q','ElevesService',function ($q,ElevesService) {

        var _value;

        var service = {
            'query': value,
            'save': save,
            'update': update,
            'get': get,
            'delete':delet
        };

        function save(data) {
            _value.push(data);
        }


        function update(data) {

            findById(data['eleves_id'], function (eleve) {
                console.log(eleve);
                _value[eleve.index] = data;
            });

        }

        function delet(id) {
            findById(id,function (eleve) {
                console.log(eleve.index)
                _value.splice(eleve.index,1)
            })

            }


            function get(id) {
                findById(id, function (eleve) {
                    console.log(eleve);
                })
            };

            function findById(id, callback) {
                var done = false;
                var eleve;
                var index;
                for (var i = 0; i < _value.length; i++) {
                    if (_value[i]['eleves_id'] === id) {
                        eleve = _value[i];
                        index = i;
                        done = true;
                    }
                }
                if (done) {
                    callback({'eleve': eleve, 'index': index});
                }
            }

            function value(){
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

