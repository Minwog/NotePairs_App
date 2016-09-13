'use strict';

app
    .controller('CoursesCtrl', function ($scope, httpq) {

        httpq.get('ressources/courses.json').then(function (data) {
            $scope.courses = data;
        });

    });