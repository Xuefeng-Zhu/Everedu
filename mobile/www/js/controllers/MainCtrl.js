/**
 * everedu.MainCtrl module
 *
 * Description
 * Define LoginCtrl, AppCtrl
 */

function LoginCtrl($scope, $ionicModal, $ionicPopup, $state, Auth) {
    $scope.account = {};
    $ionicModal.fromTemplateUrl('templates/signup.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.signupModal = modal;
    });

    // Triggered in the signup modal to close it
    $scope.closeSignup = function() {
        $scope.signupModal.hide();
    };

    // Open the signup modal
    $scope.openSignup = function() {
        $scope.signupModal.show();
    };

    /**
     * @name createAccount
     * @desc Create a new user account
     */
    $scope.createAccount = function() {
        Auth.$createUser($scope.account)
            .then(function(user) {
                $ionicPopup.alert({
                    title: 'Congratulation!',
                    template: 'You have successfully created the account.'
                });

                $scope.closeSignup();
            }).catch(function(error) {
                $ionicPopup.alert({
                    title: error.code || 'Error',
                    template: error.message,
                    okType: 'button-assertive'
                });
            });
    }

    /**
     * @name login
     * @desc Login the user into the application, and go to courese page
     */
    $scope.login = function() {
        Auth.$authWithPassword($scope.account)
            .then(function(user) {
                $state.go('courses');
            }).catch(function(error) {
                $ionicPopup.alert({
                    title: error.code || 'Error',
                    template: error.message,
                    okType: 'button-assertive'
                });
            });
    }
}


function AppCtrl($scope, $ionicModal, $timeout, CourseInfo) {
    $scope.course = CourseInfo();
}


angular.module('everedu.MainCtrl', ['firebase.auth', 'everedu.UserService'])
    .controller('AppCtrl', AppCtrl)
    .controller('LoginCtrl', LoginCtrl);