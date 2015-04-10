function AttendanceCtrl($scope) {
    $scope.records = [{
        date: 'Thu Apr 09 2015',
        status: 'miss'
    },{
        date: 'Thu Apr 07 2015',
        status: 'attend'
    }];

    $scope.takeAttendance = function(){
        var record = {
            status: 'attend'
        };
        record.date = new Date().toDateString();

        $scope.records.unshift(record);
    }
}


angular.module('everedu.AttendanceCtrl', [])
    .controller('AttendanceCtrl', AttendanceCtrl);