/**
 * everedu.AttendaceCtrl Module
 *
 * Description
 */
angular.module('everedu.AttendaceCtrl', [])
    .controller('AttendaceCtrl', ['$scope',
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

            $scope.generateCode = function() {
                $scope.validateCode = parseInt(Math.random() * 100000);
            }

            $scope.toggleState = function() {
                $scope.active = !$scope.active;
            }

        }
    ])