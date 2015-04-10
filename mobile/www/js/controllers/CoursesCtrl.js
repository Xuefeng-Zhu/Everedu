function CoursesCtrl($scope, $ionicModal) {

    $scope.showDelete = false;
    $scope.courses = [{
        name: 'CS242',
        date: 'M',
        time: '4:00pm-5:00pm'
    }, {
        name: 'CS423',
        date: 'MWF',
        time: '10:00am-10:50am'
    }];

    var course = {
        name: 'CS423',
        fullName: 'Operating Systems Design',
        instructor: 'Tarek Abdelzaher',
        location: '4126 Siebel Center',
        date: 'MWF',
        time: '10:00am-10:50am'
    }

    $ionicModal.fromTemplateUrl('templates/courseSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchModal = modal;
    });

    $scope.opensearchModal = function() {
        $scope.searchModal.show();
    };
    $scope.closesearchModal = function() {
        $scope.searchModal.hide();
    };

    $scope.searchCourse = function() {
        $scope.course = course;
    }

    $scope.onCourseDelete = function(course) {
        $scope.courses.splice(course, 1);
    }
}


angular.module('everedu.CoursesCtrl', [])
    .controller('CoursesCtrl', CoursesCtrl);