angular.module('NotePairApp')
    .factory('GroupesService', ['$resource',function($resource) {
        return $resource('http://localhost:8000/api/groupes/:id',{},{
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
    .factory('LocalGroupeService',['$q','GroupesService',function ($q,groupesService) {

        var _groupevalue;

        var service = {
            'query': value,
            'save': save,
            'update': update,
            'get': trouver,
            'delete':delet
        };

        function save(data) {
            _groupevalue.push(data);
        }


        function update(data) {

            findById(data, function (groupe) {
                console.log(groupe);
                _groupevalue[groupe.index] = data;
            });

        }

        function delet(id) {
            findById(id,function (groupe) {
                console.log(groupe.index);
                _groupevalue.splice(groupe.index,1)
            })

        }

        function trouver(id) {
            var deferred=$q.defer();
            findById(id, function (groupe) {
                console.log(groupe);
                deferred.resolve(groupe.groupe)
            })
            return deferred.promise
        };

        function findById(id, callback) {
            console.log('debut findById');
            var done = false;
            var groupe;
            var index;
            for (var i = 0; i < _groupevalue.length; i++) {
                if (_groupevalue[i]['groupes_id'] == id) {
                    groupe = _groupevalue[i];
                    index = i;
                    done = true;
                }
            }
            if (done) {

                callback({'groupe': groupe, 'index': index});
            }
        }

        function value(){
            var deferred = $q.defer();

            // check and see if we have retrieved the  data.
            // if we have, reuse it by immediately resolving
            if (!_groupevalue) {
                groupesService.query().$promise
                    .then(function (data) {
                            _groupevalue = data;
                            deferred.resolve(data);
                            console.log('wsh')
                        }
                    )
            } else {
                deferred.resolve(_groupevalue)
                console.log('fzezfze')
            }
            return deferred.promise
        }


        return service

    }]);

