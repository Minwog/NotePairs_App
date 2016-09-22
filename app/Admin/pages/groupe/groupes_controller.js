angular.module('NotePairApp')
    .controller('GroupesController',['$scope','$state','$stateParams', 'alerteService', 'LocalGroupeService',function ($scope,$state,$stateParams, alerteService, LocalGroupeService) {

        LocalGroupeService.query().then(function (data) {
            $scope.GroupeList=data;
        });

       $scope.deleteGroupe=function (id) {
           if(alerteService.showPopup('Voulez-vous vraiment supprimer ce groupe ?')){
               LocalGroupeService.delete(id);
           }
           $state.go('admin.groupes')
       };

       $scope.goToAdd=function () {
           $state.go('admin.groupes.add');
       }

       $scope.goToUpdate=function (id) {
           $state.go('admin.groupes.update',{id:id})
       }
    }])


    .controller('UpdateGroupesController',['$scope','$state','$stateParams', 'alerteService', 'LocalGroupeService', 'LocalElevesService',function ($scope,$state,$stateParams, alerteService, LocalGroupeService, LocalElevesService) {

        LocalGroupeService.get($stateParams.id).then(function(data){
            console.log(data);
            $scope.Groupe=data;
        });

        LocalElevesService.query().then(function (data) {
            $scope.ListEleves=data;
        });

        $scope.updateGroupe = function () {
            var done1=false;
            var done2=false;

            for(var i=0;i<$scope.addcours.length;i++){
                $scope.Groupe.cours.push($scope.addcours[i]);
                if(i===$scope.addcours.length-1){
                    done1=true
                }
            }
            for(var i=0;i<$scope.addeleves.length;i++){
                $scope.Groupe.eleves.push($scope.addeleves[i]);
                if(i===$scope.addeleves.length-1){
                    done2=true
                }
            }
            if(done1&&done2) {
                LocalGroupeService.update($scope.Groupe);
                console.log($scope.Groupe);
                $state.go('admin.groupes');
            }
        };

        $(document).ready(function(){
            $('.selectpicker').selectpicker();
        });

        $scope.ListCours=[
            'Electrotechniques'
        ]

    }])

    .controller('AddGroupesController',['$scope','$state','$stateParams', 'alerteService', 'LocalGroupeService','LocalElevesService',function ($scope,$state,$stateParams, alerteService, LocalGroupeService, LocalElevesService) {

        LocalElevesService.query().$promise.then(function (data) {
            $scope.ListEleves=data;
        });


        $scope.newGroupe = {
            groupes_id: Math.floor((Math.random() * 100000)),
            numero:'',
            cours:[],
            eleves:[]
        };

//--- Methode add pour ajouter un Groupe à la liste ---//
        $scope.addGroupe = function () {

            LocalGroupeService.save($scope.newGroupe);
            $state.go('admin.groupes')
        };

        $(document).ready(function(){
            $('.selectpicker').selectpicker();
        });

    }]);