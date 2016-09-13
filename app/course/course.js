'use strict';

app
    .controller('CourseCtrl', function ($scope, httpq) {

        httpq.get('../ressources/sections.json').then(function (data) {
            $scope.sections = data;
        });

    });