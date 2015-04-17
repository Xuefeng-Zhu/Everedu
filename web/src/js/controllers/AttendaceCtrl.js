/**
 * everedu.AttendanceCtrl Module
 *
 * Description
 * define AttendanceCtrl  
 */
angular.module('everedu.AttendanceCtrl', [])
    // controller used to manage addentance page
    .controller('AttendanceCtrl', ['$scope',
        function($scope) {
            $scope.active = false;

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
            $scope.pieChart.cssStyle = "height:300px; width:400px;";

            $scope.attendant = $scope.absentee = [];
            for (var i = 0; i < 50; i++){
            	$scope.absentee.push({
            		name: "Student " + parseInt(Math.random()*1000),
            		date: new Date().toString()
            	})
            }

             /**
             * @name generateCode
             * @desc Generate validate code used for attendance
             */
            $scope.generateCode = function() {
                $scope.validateCode = parseInt(Math.random() * 100000);
            }

             /**
             * @name toggleState
             * @desc toggle the option if accepting attendance record
             */
            $scope.toggleState = function() {
                $scope.active = !$scope.active;
            }

        }
    ])