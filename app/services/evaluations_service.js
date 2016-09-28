angular.module('NotePairApp')
    .factory('EvaluationsService', ['$resource',function($resource) {
        return $resource('/resources/json/sections2.json',{},{
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

    .factory('LocalEvaluationsService',['$q','EvaluationsService',function ($q,EvaluationsService) {

        var _Evaluationsvalue;

        var service = {
            'query': value,
            'save': save,
            'update': update,
            'get': trouver,
            'delete':delet
        };

        function save(data) {
            _Evaluationsvalue.push(data);
        }


        function update(data) {

            findById(data, function (eval) {
                console.log(eval);
                _Evaluationsvalue[eval.index] = data;
            });

        }

        function trouver(id) {
            var deferred=$q.defer();
            findById(id, function (eval) {
                console.log(eval);
                deferred.resolve(eval.evaluation)
            })
            return deferred.promise
        }

        function delet(id) {
            findById(id,function (eval) {
                console.log(eval.index);
                _Evaluationsvalue.splice(eval.index,1)
            })

        }

        function value(){
            var deferred = $q.defer();

            // check and see if we have retrieved the  data.
            // if we have, reuse it by immediately resolving
            if (!_Evaluationsvalue) {
                EvaluationsService.query().$promise
                    .then(function (data) {
                            _Evaluationsvalue = data;
                            deferred.resolve(data);
                        }
                    )
            } else {
                deferred.resolve(_Evaluationsvalue)
                console.log('fzezfze')
            }
            return deferred.promise
        }


        return service

    }]);