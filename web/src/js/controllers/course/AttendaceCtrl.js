/**
 * everedu.AttendanceCtrl Module
 *
 * Description
 * define AttendanceCtrl
 */
angular.module('everedu.AttendanceCtrl', [])
// controller used to manage addentance page
.controller('AttendanceCtrl', ['$scope', 'Attendance',
    function($scope, Attendance) {
        $scope.cal = {
            show: false,
            date: new Date()
        };
        $scope.control = Attendance.getControl($scope.cal.date.toDateString());
        $scope.attendant = Attendance.getAttendant($scope.cal.date.toDateString());
        $scope.absentee = Attendance.getAbsentee($scope.cal.date.toDateString());

        $scope.chartLabels = ['Attendant', 'Absentee'];
        $scope.chartData = [50, 10];

        /**
         * @name generateCode
         * @desc Generate validate code used for attendance
         */
        $scope.generateCode = function() {
            $scope.control.validateCode = parseInt(Math.random() * 100000);
            $scope.control.$save();
        }

        /**
         * @name toggleState
         * @desc toggle the option if accepting attendance record
         */
        $scope.toggleState = function() {
            if ($scope.control.active == undefined){
                $scope.control.active = false;
                Attendance.initAbsentee();
            }
            
            if ($scope.control.validateCode == undefined) {
                sweetAlert('Warning', 'Please generate code first!', 'error');
                return;
            }

            $scope.control.active = !$scope.control.active;
            $scope.control.$save();
        }

        /**
         * @name toggleCal
         * @desc toggle the date picker
         */
        $scope.toggleCal = function($event) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.cal.show = true;
        }

    }
])