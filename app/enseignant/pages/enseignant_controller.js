angular.module('NotePairApp')
    .controller('EnseignantController',['$scope','$state','$stateParams', 'httpq',  function ($scope,$state,$stateParams,httpq) {

        $scope.enseignantCo =
        {
            "enseignant_id": "57dfeaf1e8f757d807dcd035",
            "user_id": "57dfeaf1ab1de26fd76523ba",
            "prenom": "Ulli",
            "nom": "Baker",
            "email": "ullibaker@gmail.com",
            "cours": [
                "Physique quantique",
                "Representation analytique des signaux et systemes",
                "Composants à semiconducteurs"
            ],
            "avatar":"../resources/images/avatar.jpg"
        }

    }])