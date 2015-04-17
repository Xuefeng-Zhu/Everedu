/**
 * everedu.MainCtrl module
 *
 * Description
 * Define LoginCtrl, AppCtrl
 */

function LoginCtrl($scope, $ionicModal, $ionicPopup, $state) {
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
        if ($scope.account.email == undefined || $scope.account.password == undefined ||
            $scope.account.email == "" || $scope.account.password == "") {
            $ionicPopup.alert({
                title: 'Error!',
                template: 'Your email or password is empty!',
                okType: 'button-assertive'
            });
            return;
        }
        $scope.closeSignup();

        $ionicPopup.alert({
            title: 'Congratulation!',
            template: 'You have successfully registered the account.'
        });
    }

    /**
    * @name login
    * @desc Login the user into the application, and go to courese page
    */
    $scope.login = function() {
        if ($scope.account.email == undefined || $scope.account.password == undefined ||
            $scope.account.email == "" || $scope.account.password == "") {
            $ionicPopup.alert({
                title: 'Error!',
                template: 'Your email or password is empty!',
                okType: 'button-assertive'
            });
            return;
        }
        $state.go('courses');
    }
}


function AppCtrl($scope, $ionicModal, $timeout) {
    $scope.course = {
        courseID: 'CS423',
        fullName: 'Operating Systems Design',
        instructor: 'Tarek Abdelzaher',
        location: '4126 Siebel Center',
        day: 'MWF',
        time: '10:00am-10:50am',
        announcement: 'Update: NSF-sponsored (paid) research and development project\
         opportunities are available for undergraduate students on selected topics. \
         Contact instructor for detail. Graduate students interested in RAships are also welcome'
    }
}


angular.module('everedu.MainCtrl', [])
    .controller('AppCtrl', AppCtrl)
    .controller('LoginCtrl', LoginCtrl);