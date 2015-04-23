/**
 * everedu.CourseCtrl Module
 *
 * Description
 * Define CourseCtrl
 */

function CoursesCtrl($scope, $ionicModal, $ionicPopup, CourseList, CourseInfo) {
    $scope.showDelete = false;
    $scope.courses = CourseList.getCourses($scope.uid);

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
     * @desc Search for specific course, if the course number
     * does not exist, info the user with popup
     */
    $scope.searchCourse = function(courseNumber) {
        var course = CourseInfo(courseNumber.toUpperCase());
        course.$loaded(function(res) {
            if (res.courseID == undefined) { 
                $ionicPopup.alert({
                    title: 'Error',
                    template: 'The course number does not exist!',
                    okType: 'button-assertive'
                });
            } else {
                $scope.course = course;
            }
        });
    }

    /**
     * @name joinCourse
     * @desc Add the course into course list
     */
    $scope.joinCourse = function() {
        CourseList.addCourse($scope.course);
        $scope.closesearchModal();
    }

    /**
     * @name onCourseDelete
     * @desc Delete the course from course list
     */
    $scope.onCourseDelete = function(index) {
        CourseList.deleteCourse(index);
    }
}


angular.module('everedu.CoursesCtrl', ['everedu.UserService'])
    .controller('CoursesCtrl', CoursesCtrl);