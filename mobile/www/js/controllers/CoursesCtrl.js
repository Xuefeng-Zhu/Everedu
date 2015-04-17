/**
 * everedu.CourseCtrl Module
 *
 * Description
 * Define CourseCtrl
 */

function CoursesCtrl($scope, $ionicModal, $ionicPopup) {
    $scope.showDelete = false;
    $scope.courses = [{
        courseID: 'CS242',
        day: 'M',
        time: '4:00pm-5:00pm'
    }, {
        courseID: 'CS425',
        day: 'TR',
        time: '9:30am-10:45am'
    }];

    var course = {
        courseID: 'CS423',
        fullName: 'Operating Systems Design',
        instructor: 'Tarek Abdelzaher',
        location: '4126 Siebel Center',
        day: 'MWF',
        time: '10:00am-10:50am'
    }

    $ionicModal.fromTemplateUrl('templates/courseSearch.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.searchModal = modal;
    });

    // show the search modal
    $scope.opensearchModal = function() {
        $scope.searchModal.show();
    };
    // hide the search modal
    $scope.closesearchModal = function() {
        $scope.searchModal.hide();
    };

    /**
    * @name search Course
    * @desc Search for specific course 
    */
    $scope.searchCourse = function() {

        $scope.course = course;
    }

    /**
    * @name joinCourse
    * @desc Add the course into course list
    */
    $scope.joinCourse = function() {
        $scope.courses.push($scope.course);
        $scope.closesearchModal();
    }

    /**
    * @name onCourseDelete
    * @desc Delete the course from course list
    */
    $scope.onCourseDelete = function(course) {
        $scope.courses.splice(course, 1);
    }
}


angular.module('everedu.CoursesCtrl', [])
    .controller('CoursesCtrl', CoursesCtrl);