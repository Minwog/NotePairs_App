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
    .factory('LocalElevesService',function () {
        var service={
            'save':save,
            'update':update,
            'get':get
        }

        function save(data) {

            var List=JSON.parse(localStorage.getItem('ElevesList'));
            console.log(List)
            List.push(data);
            localStorage.setItem('ElevesList',JSON.stringify(List));

        }

        function update(data){
           var local=JSON.parse(localStorage.getItem('ElevesList'));
            findById(data['eleve_id'],local,function(eleve){
                local[eleve.index]=data;
                localStorage.setItem(JSON.stringify('ElevesList'),local)
            });

        }

        function get(id){
            findById(id,JSON.parse(localStorage.getItem('ElevesList')),function(eleve){
                console.log(eleve['eleve'])
                return eleve['eleve'];

            })
        }

        function findById(id,List,callback) {
            var done=false;
            var eleve;
            var index;
            for(var i=0;i<List.length;i++){
                if (List[i]['eleve_id']===id){
                    eleve=List[i];
                    index=i;
                    done=true;
                }
            }
            if(done){
                callback({'eleve':eleve,'index':index});
            }
        }

        return service
    });

