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

        $scope.pieChart = {};
        $scope.pieChart.data = {
            "cols": [{
                id: "t",
                label: "Status",
                type: "string"
            }, {
                id: "s",
                label: "Count",
                type: "number"
            }],
            "rows": [{
                c: [{
                    v: "Attendant"
                }, {
                    v: 40
                }]
            }, {
                c: [{
                    v: "Absentee"
                }, {
                    v: 5
                }]
            }]
        };

        $scope.pieChart.type = 'PieChart';
        $scope.pieChart.cssStyle = "height:270px; width:400px;";

        $scope.attendant = $scope.absentee = [];
        for (var i = 0; i < 50; i++) {
            $scope.absentee.push({
                name: "Student " + parseInt(Math.random() * 1000),
                date: new Date().toString()
            })
        }

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