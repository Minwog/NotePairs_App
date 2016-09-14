
angular.module('NotePairApp',[]).controller('ElevesDeleteController',function ($scope,$state) {

    $scope.deleteEleves = function (ElevesList) {
        if (alerteService.showPopup('Voulez-vous réellement supprimer la liste d\'élèves ?')) {
            ElevesList.$delete(function () {
                $window.location.href = '';
            });
        }
    }
});