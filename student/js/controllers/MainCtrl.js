/**
 * everedu.MainCtrl module
 *
 * Description
 * Define LoginCtrl, AppCtrl
 */

/**
 * Define the bevior when user login and sign up for a new account
 */
function LoginCtrl($scope, $rootScope, $ionicModal, $ionicPopup, $state, Auth) {
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

                // show error info
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
                $rootScope.uid = user.uid;
                $state.go('courses');
            }).catch(function(error) {

                // show error info
                $ionicPopup.alert({
                    title: error.code || 'Error',
                    template: error.message,
                    okType: 'button-assertive'
                });
            });
    }
}

/**
 * Store selected course info and user info
 */
function AppCtrl($scope, $rootScope, CourseInfo, Profile) {
    $scope.course = CourseInfo();
    $rootScope.profile = Profile($scope.uid);

    $rootScope.$on('$stateChangeSuccess', function() {
        $scope.course = CourseInfo();
    })
}


angular.module('everedu.MainCtrl', ['firebase.auth', 'everedu.UserService'])
    .controller('AppCtrl', AppCtrl)
    .controller('LoginCtrl', LoginCtrl);