angular.module('NotePairApp')
    .factory('EvaluationsService', ['$resource',function($resource) {
        return $resource('/http://localhost:8000/api/evaluations/:id',{},{
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

        function getSections(id) {
            var deferred=$q.defer();
            $http.get('http://localhost:8000/api/evaluations/'+id+'/sections').success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function getCriteres(id) {
            var deferred=$q.defer();
            $http.get('http://localhost:8000/api/sections/'+id+'/criteres').success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function createSection(id, section){
            var deferred=$q.defer();
            $http.post('http://localhost:8000/api/evaluations/'+id+'/sections', section).success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function createCritere(id, critere){
            var deferred=$q.defer();
            $http.post('http://localhost:8000/api/sections/'+id+'/add_critere', critere).success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function updateSection(id){
            var deferred=$q.defer();
            $http.put('http://localhost:8000/api/sections/'+id, section).success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function updateCritere(id){
            var deferred=$q.defer();
            $http.put('http://localhost:8000/api/criteres/'+id, critere).success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function deleteSection(id){
            var deferred=$q.defer();
            $http.delete('http://localhost:8000/api/sections/'+id).success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function deleteCritere(id){
            var deferred=$q.defer();
            $http.delete('http://localhost:8000/api/criteres/'+id).success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function updateOrdreSection(id, ordre){
            var deferred=$q.defer();
            $http.delete('http://localhost:8000/api/sections/'+id+'/update_ordre'+ordre).success(
                function (data) {
                    deferred.resolve(data);
                    console.log(data);
                }
            )
            return deferred.promise
        }

        function updateOrdreCritere(id, ordre){
            var deferred=$q.defer();
            $http.delete('http://localhost:8000/api/criteres/'+id+'/update_ordre'+ordre).success(
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
            'getSections':getSections,
            'getCriteres':getCriteres,
            'createSection':createSection,
            'createCritere':createCritere,
            'updateSection':updateSection,
            'updateCritere':updateCritere,
            'deleteSection':deleteSection,
            'deleteCritere':deleteCritere,
            'updateOrdreSection':updateOrdreSection,
            'updateOrdreCritere':updateOrdreCritere
        };
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
            }
            return deferred.promise
        }


        return service

    }]);