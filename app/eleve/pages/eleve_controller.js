angular.module('NotePairApp')
    .controller('EleveController',['$scope','$state','$stateParams', 'httpq',  function ($scope,$state,$stateParams,httpq) {

        $scope.eleveCo =
        {
            "enseignant_id": "57dfeaf1e8f757d807dcd035",
            "user_id": "57dfeaf1ab1de26fd76523ba",
            "prenom": "Cross",
            "nom": "Cazier",
            "email": "cross@test.com",
            "cours": [
                "Physique quantique",
                "Representation analytique des signaux et systemes",
                "Composants à semiconducteurs"
            ],
            "avatar":"../resources/images/avatar.jpg"
        }

    }])