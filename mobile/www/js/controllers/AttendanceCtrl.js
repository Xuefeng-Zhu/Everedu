/**
 * everedu.AttendanceCtrl Module
 *
 * Description
 * define AttendanceCtrl
 */

function AttendanceCtrl($scope, $ionicPopup, Attendance) {
    $scope.records = Attendance.getRecord($scope.uid);

    $scope.control = Attendance.getControl(new Date().toDateString());

    /**
     * @name takeAttendance
     * @desc put the attendance record into server
     */
    $scope.takeAttendance = function(validateCode) {
        if (!$scope.control.active) {
            errorAlert('The attendance is not active.');
            return;
        }
        if ($scope.control.validateCode != validateCode) {
            errorAlert('The validate is incorrect.');
            return;
        }

        var record = {
            status: 'attend'
        };
        record.date = new Date().toDateString();

        $scope.records.$add(record);
    }

    function errorAlert(message) {
        $ionicPopup.alert({
            title: 'Error',
            template: message,
            okType: 'button-assertive'
        });
    }
}


angular.module('everedu.AttendanceCtrl', ['everedu.CourseService'])
    .controller('AttendanceCtrl', AttendanceCtrl);