/**
 * everedu.CourseCtrl Module
 *
 * Description
 * Define InfoCtrl, and inject other course related controller
 */
angular.module('everedu.CourseCtrl', ['everedu.AttendanceCtrl', 'everedu.QuizCtrl'])
    // controller used to manage course informaton page
    .controller('InfoCtrl', ['$scope', '$filter',
        function($scope, $filter) {
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

            $scope.course = {
                announcement: 'Update: NSF-sponsored (paid) research and development project opportunities are available for undergraduate students on selected topics. Contact instructor for detail. Graduate students interested in RAships are also welcome',
                courseID: 'CS423',
                fullName: 'Operating Systems Design',
                instructor: 'Tarek Abdelzaher',
                location: '4126 Siebel Center',
                day: 'MWF',
                startTime: '10:00 AM',
                endTime: '10:50 AM'
            }

             /**
             * @name editAnnouncement
             * @desc Edit the course announcement
             */
            $scope.editAnnouncement = function() {
                if ($scope.editing.announcement) {
                    $scope.course.announcement = $scope.copy.announcement;
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
                    $scope.course.startTime =
                        $filter('date')($scope.schedule.startTime, 'h:mm a');
                    $scope.course.endTime =
                        $filter('date')($scope.schedule.endTime, 'h:mm a');

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