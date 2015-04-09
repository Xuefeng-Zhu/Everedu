function LoginCtrl($scope, $ionicModal, $state) {
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

    $scope.createAccount = function() {
        $scope.closeSignup()
    }

    $scope.login = function() {
        $state.go('courses');
    }
}


function AppCtrl($scope, $ionicModal, $timeout) {
    // Open the login modal
    $scope.login = function() {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function() {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function() {
            $scope.closeLogin();
        }, 1000);
    };
}


angular.module('everedu.MainCtrl', [])
    .controller('AppCtrl', AppCtrl)
    .controller('LoginCtrl', LoginCtrl);