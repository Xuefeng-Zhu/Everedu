angular.module('everedu')
    .controller('LoginCtrl', ['$scope', '$modal',
        function($scope, $modal) {
            $scope.openSignup = function() {
                $modal.open({
                    templateUrl: 'signupModal.html',
                    controller: 'SignupCtrl',
                });

            }
        }
    ])
    .controller('SignupCtrl', ['$scope', '$modalInstance',
        function($scope, $modalInstance) {
        	$scope.$modalInstance = $modalInstance;

        	$scope.account = {};
        	
        	$scope.signup = function() {
        		$modalInstance.close($scope.account);
        	}
        }
    ]);