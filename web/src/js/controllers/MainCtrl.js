/**
 * everedu.MainCtrl module
 *
 * Description
 * Define LoginCtrl, SignupCtrl, MainCtrl
 */

angular.module('everedu.MainCtrl', ['firebase.auth', 'everedu.UserService'])
// Controller used for login
.controller('LoginCtrl', ['$scope', '$modal', '$state', 'Auth',

    function($scope, $modal, $state, Auth) {
        $scope.account = {};

        /**
         * @name login
         * @desc Login into the system with user's input
         */
        $scope.login = function() {
            Auth.$authWithPassword($scope.account)
                .then(function(user) {
                    $state.go('dashboard.user.profile');
                }).catch(function(error) {
                    console.log(error)
                    sweetAlert(error.code||'Error', error.message, 'error');
                });
        }

        /**
         * @name openSignup
         * @desc Open the signup modal
         */
        $scope.openSignup = function() {
            var model = $modal.open({
                templateUrl: 'signupModal.html',
                controller: 'SignupCtrl',
            });

            model.result.then(function(account) {
                $scope.account = account;
            })

        }
    }
])
// Controller used for signup
.controller('SignupCtrl', ['$scope', '$modalInstance', 'Auth', 'Profile',
    function($scope, $modalInstance, Auth, Profile) {
        $scope.$modalInstance = $modalInstance;

        $scope.account = {};

        /**
         * @name signup
         * @desc Create a new account
         */
        $scope.signup = function() {
            Auth.$createUser($scope.account)
                .then(function(user) {
                    sweetAlert('Congratulations!',
                        'You have successfully created the account',
                        'success');

                    var profile = Profile(user.uid);
                    profile.name = "Not set";
                    profile.$save(); 

                    $modalInstance.close($scope.account);
                }).catch(function(error) {
                    sweetAlert(error.code, error.message, 'error');
                });
        }
    }
])
// Controller for the whole dashboard
.controller('MainCtrl', ['$scope', '$rootScope', '$state', 'Auth', 'Profile',
    function($scope, $rootScope, $state, Auth, Profile) {
        $rootScope.$state = $state;
        $scope.fullSidebar = true;
        $scope.profile = Profile($scope.uid);
        /**
         * @name toggleSidebar
         * @desc Toggle the side bar between full size or small size
         */
        $scope.toggleSidebar = function() {
            $scope.fullSidebar = !$scope.fullSidebar;
        };

        /**
         * @name logout
         * @desc Log the user out, and go to the login page
         */
        $scope.logout = function() {
            Auth.$unauth();
            $state.go('login');
        }


    }
])