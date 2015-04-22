/**
 *  everedu.UserCtrl Module
 *
 * Description
 * define controllers used to manage course list, and user profile
 */
angular.module('everedu.UserCtrl', ['everedu.UserService'])
// controller used to store course list info
.controller('UserCtrl', ['$scope', '$modal', 'CourseList',
    function($scope, $modal, CourseList) {
        $scope.courses = CourseList($scope.uid);

        /**
         * @name openCourseModal
         * @desc Open the modal used to create course, and push
         * the new course to the course list
         */
        $scope.openCourseModal = function() {
            var modal = $modal.open({
                templateUrl: 'CourseModal.html',
                controller: 'CreateCourseCtrl',
            });
            console.log($scope.courses)
            modal.result.then(function(course) {
                $scope.courses.addCourse(course);
            });
        }
    }
])
// controller used to create course
.controller('CreateCourseCtrl', ['$scope', '$modalInstance', '$filter',
    function($scope, $modalInstance, $filter) {
        $scope.$modalInstance = $modalInstance;

        $scope.course = {};
        $scope.schedule = {
            day: {
                M: false,
                T: false,
                W: false,
                R: false,
                F: false
            }
        };

        /**
         * @name create
         * @desc Format new course data, and pass the data back
         * to parent controller
         */
        $scope.create = function() {
            var day = "";
            angular.forEach($scope.schedule.day, function(value, key) {
                if (value) {
                    day += key;
                }
            })

            $scope.course.day = day;

            if ($scope.schedule.startTime) {
                $scope.course.startTime =
                    $filter('date')($scope.schedule.startTime, 'h:mm a');

            }
            if ($scope.schedule.endTime) {
                $scope.course.endTime =
                    $filter('date')($scope.schedule.endTime, 'h:mm a');
            }

            $modalInstance.close($scope.course);
        }
    }
])
// controller used to manage user profile
.controller('ProfileCtrl', ['$scope', '$filter', 'Profile',
    function($scope, $filter, Profile) {
        $scope.editing = false;
        $scope.profile = Profile($scope.uid)

        /**
         * @name edit
         * @desc Edit the user profile
         */
        $scope.edit = function() {
            if ($scope.editing) {
                $scope.profile.name = $scope.copy.name;
                if ($scope.copy.officeHour) {
                    $scope.profile.officeHour =
                        $filter('date')($scope.copy.officeHour, 'h:mm a');
                }
                $scope.profile.$save();
            } else {
                $scope.copy = angular.copy($scope.profile);
            }

            $scope.editing = !$scope.editing;
        }
    }
])