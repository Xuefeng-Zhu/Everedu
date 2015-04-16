/**
 * everedu.MainCtrl module 
 * 
 * Define LoginCtrl, SignupCtrl, MainCtrl
 */

angular.module('everedu.MainCtrl', [])
	// Controller used for login
    .controller('LoginCtrl', ['$scope', '$modal', '$state',
        function($scope, $modal, $state) {
        	 /**
			 * @name login
			 * @desc Login into the system with user's input
          	 */
            $scope.login = function() {
                $state.go('dashboard.user.profile');
            }

            /**
			 * @name openSignup
			 * @desc Open the signup modal
          	 */
            $scope.openSignup = function() {
                $modal.open({
                    templateUrl: 'signupModal.html',
                    controller: 'SignupCtrl',
                });

            }
        }
    ])
    // Controller used for signup
    .controller('SignupCtrl', ['$scope', '$modalInstance',
        function($scope, $modalInstance) {
            $scope.$modalInstance = $modalInstance;

            $scope.account = {};

          	/**
			 * @name signup
			 * @desc Create a new account
          	 */
            $scope.signup = function() {
                $modalInstance.close($scope.account);
            }
        }
    ])
    // Controller for the whole dashboard
    .controller('MainCtrl', ['$scope',
        function($scope) {
        	$scope.fullSidebar = true;

        	/**
			 * @name toggleSidebar
			 * @desc Toggle the side bar between full size or small size
          	 */
            $scope.toggleSidebar = function() {
                $scope.fullSidebar = !$scope.fullSidebar;
            };
        }
    ])