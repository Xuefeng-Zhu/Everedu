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
        $scope.chartData = [0, 0];

        // update chart attendant value based on attendant length
        $scope.$watch("attendant.length", function(value) {
            $scope.chartData[0] = value;
        });

        // update chart absentee value based on absentee length
        $scope.$watch("absentee.length", function(value) {
            $scope.chartData[1] = value;
        });

        // update control, attendant, and absentee if another date gets selected
        $scope.$watch("cal.date", function(value) {
            $scope.control = Attendance.getControl(value.toDateString());
            $scope.attendant = Attendance.getAttendant(value.toDateString());
            $scope.absentee = Attendance.getAbsentee(value.toDateString());
        })

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
            if ($scope.control.active == undefined) {
                $scope.control.active = false;
                Attendance.initAbsentee();
            }

            if ($scope.control.validateCode == undefined) {
                sweetAlert('Warning', 'Please generate code first!', 'error');
                return;
            }

            $scope.control.active = !$scope.control.active;
            $scope.control.$save();

            if (!$scope.control.active) {
                Attendance.setAbsentee();
            }
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