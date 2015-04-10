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