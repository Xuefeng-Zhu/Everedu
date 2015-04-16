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
                	console.log(course);
                })
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
            	for (var d in $scope.schedule.day){
            		if ($scope.schedule.day[d]){
            			day += d;
            		}
            	}
            	$scope.course.day = day;

                $scope.course.startTime = 
                	$filter('date')($scope.schedule.startTime, 'h:mm a');
                $scope.course.endTime = 
                	$filter('date')($scope.schedule.endTime, 'h:mm a');

                $modalInstance.close($scope.course);
            }
        }
    ])
    .controller('ProfileCtrl', ['$scope',
        function($scope) {

        }
    ])