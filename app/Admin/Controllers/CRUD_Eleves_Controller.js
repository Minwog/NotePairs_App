angular.module('NotePairApp').controller('CRUDElevesController',function($scope, CRUD_Eleves) {
    var eleve = CRUD_Eleves.get({ id: $scope.id }, function() {
        console.log(eleve);
    }); // get() returns a single eleve

    var eleves = CRUD_Eleves.query(function() {
        console.log(eleves);
    }); //query() returns all the eleves

    $scope.eleve = new CRUD_Eleves(); //You can instantiate resource class

    $scope.eleve.data = 'some data';

    CRUD_Eleves.save($scope.eleve, function() {
        //data saved. do something here.
    }); //saves an eleve. Assuming $scope.eleve is the CRUD_Eleves object
});
