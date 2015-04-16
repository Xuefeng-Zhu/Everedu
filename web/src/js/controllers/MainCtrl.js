angular.module('everedu')
    .controller('LoginCtrl', ['$scope', '$modal', '$state',
        function($scope, $modal, $state) {
            $scope.login = function() {
                $state.go('dashboard.user.profile');
            }

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
    ])
    .controller('MainCtrl', ['$scope',
        function($scope) {
        	$scope.fullSidebar = true;

            $scope.toggleSidebar = function() {
                $scope.fullSidebar = !$scope.fullSidebar;
            };
        }
    ])