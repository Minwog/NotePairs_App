angular.module('NotePairApp')
    .controller('EnseignantsController',['$scope','$state','$stateParams', 'alerteService', 'EnseignantsService', function ($scope,$state,$stateParams, alerteService, EnseignantsService) {
        $scope.EnseignantsList=JSON.parse(localStorage.getItem("EnseignantsList"));
        if (!localStorage['EnseignantsList']){
            EnseignantsService.query().$promise.then(function (data) {
                localStorage.setItem('EnseignantsList', JSON.stringify(data));
            })
        }
//        $scope.EnseignantsList = JSON.parse(localStorage.getItem('ListeLocale'));
        $scope.newEnseignant = {Nom:'',
            Prenom:'',
            email:'',
            username:''};

//--- Methode add pour ajouter un Enseignant à la liste ---//
        $scope.addEnseignant=function(){
            console.log($scope.newEnseignant);
            $scope.EnseignantsList.push($scope.newEnseignant);
            localStorage.setItem("EnseignantsList",JSON.stringify($scope.EnseignantsList));
            $state.go('admin.enseignants')
        };


//--- Methode update pour modifier un Enseignant à partir de son id ---//
        $scope.Enseignant=EnseignantsService.query({id:$stateParams.id});
        console.log("dans ens Ctrl")

        $scope.updateEnseignant=function(){
            console.log("dans updateEnseignant")
            $scope.Enseignant.$update(function(){
                console.log("dans la function update")
            });
        };

//--- Methode get pour afficher un Enseignant à partir de son id ---//
        $scope.getEnseignant=function(){
            $scope.Enseignant=EnseignantsService.query({id:$stateParams.id});
        };
//--- Methode get pour afficher un Enseignant à partir de son id ---//
        $scope.getAllEnseignants=function () {
            $scope.EnseignantsList= EnseignantsService.query();
        };

//--- Methode delete pour supprimer un Enseignant à partir de son id ---//
        $scope.deleteEnseignant=function() {
            $scope.Enseignant = EnseignantsService.query({id: $stateParams.id});
            if(alerteService.showPopup('Voulez-vous vraiment supprimer cet Enseignant ?')){
                Enseignant.$delete();
            }
        };

        $scope.goToAdd=function () {
            $state.go('admin.enseignants.add')
        };

        $scope.goToUpdate=function (_id) {

            $state.go('admin.enseignants.update',{id:_id});
            $scope.Enseignant = EnseignantsService.query({id:_id})
        };
    }]);