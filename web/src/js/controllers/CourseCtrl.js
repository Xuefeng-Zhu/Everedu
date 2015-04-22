/**
 * everedu.CourseCtrl Module
 *
 * Description
 * Define InfoCtrl, and inject other course related controller
 */
angular.module('everedu.CourseCtrl', ['everedu.AttendanceCtrl', 'everedu.QuizCtrl',
    'everedu.CourseService'
])
// controller used to manage course informaton page
.controller('InfoCtrl', ['$scope', '$filter', 'CourseInfo',
    function($scope, $filter, CourseInfo) {
        $scope.editing = {
            announcement: false,
            description: false
        };

        $scope.schedule = {
            day: {
                M: false,
                T: false,
                W: false,
                R: false,
                F: false
            }
        };

        $scope.course = CourseInfo();

        /**
         * @name editAnnouncement
         * @desc Edit the course announcement
         */
        $scope.editAnnouncement = function() {
            if ($scope.editing.announcement) {
                $scope.course.announcement = $scope.copy.announcement;
                $scope.course.$save()
            } else {
                $scope.copy = angular.copy($scope.course);
            }

            $scope.editing.announcement = !$scope.editing.announcement;
        }

        /**
         * @name editDescription
         * @desc Edit the course description, and make sure
         * the data is properlly formatted
         */
        $scope.editDescription = function() {
            if ($scope.editing.description) {
                var day = "";
                angular.forEach($scope.schedule.day, function(value, key) {
                    if (value) {
                        day += key;
                    }
                })

                $scope.course.courseID = $scope.copy.courseID;
                $scope.course.fullName = $scope.copy.fullName;
                $scope.course.location = $scope.copy.location;
                $scope.course.day = day;
                if ($scope.schedule.startTime) {
                    $scope.course.startTime =
                        $filter('date')($scope.schedule.startTime, 'h:mm a');

                }
                if ($scope.schedule.endTime) {
                    $scope.course.endTime =
                        $filter('date')($scope.schedule.endTime, 'h:mm a');
                }
                $scope.course.$save();

            } else {
                angular.forEach($scope.course.day, function(value) {
                    $scope.schedule.day[value] = true;
                })
                $scope.copy = angular.copy($scope.course);
            }

            $scope.editing.description = !$scope.editing.description;
        }
    }
])