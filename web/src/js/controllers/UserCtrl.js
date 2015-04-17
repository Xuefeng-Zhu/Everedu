/**
 *  Module
 *
 * Description
 */
angular.module('everedu.UserCtrl', [])
    .controller('UserCtrl', ['$scope', '$modal',
        function($scope, $modal) {
            $scope.courses = [{
                courseID: 'CS242',
                day: 'M',
                time: '4:00pm-5:00pm'
            }, {
                courseID: 'CS425',
                day: 'TR',
                time: '9:30am-10:45am'
            }];

            $scope.openCourseModal = function() {
                var modal = $modal.open({
                    templateUrl: 'CourseModal.html',
                    controller: 'CreateCourseCtrl',
                });

                modal.result.then(function(course) {
                	$scope.courses.push(course);
                });
            }
        }
    ])
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

            $scope.create = function() {
            	var day = "";
                angular.forEach($scope.schedule.day, function(value, key){
                    if (value){
                        day += key;
                    }
                })

            	$scope.course.day = day;

                $scope.course.startTime = 
                	$filter('date')($scope.schedule.startTime, 'h:mm a');
                $scope.course.endTime = 
                	$filter('date')($scope.schedule.endTime, 'h:mm a');

                $modalInstance.close($scope.course);
            }
        }
    ])
    .controller('ProfileCtrl', ['$scope', '$filter',
        function($scope, $filter) {
            $scope.editing = false;
            $scope.user = {
                name: 'Frank Zhu',
                officeHour: 'Not Available'
            }

            $scope.edit = function() {
                if ($scope.editing) {
                    $scope.user.name = $scope.copy.name;
                    $scope.user.officeHour = $filter('date')($scope.copy.startTime, 'h:mm a');
                }

                $scope.copy = angular.copy($scope.user);
                $scope.editing = !$scope.editing;
            }
        }
    ])