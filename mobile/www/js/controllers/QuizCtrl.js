/**
 * everedu.QuizCtrl Module
 *
 * Description
 * The controllers used to manage quiz state interface
 */
function QuizCtrl($scope, Quiz) {
    $scope.currentQuiz = Quiz.getCurrentQuiz();
    $scope.completedQuiz = Quiz.getCompletedQuiz();
}

function QuizListCtrl($scope, $stateParams, Quiz) {
    $scope.status = $stateParams.status;
    if ($scope.status == 'current') {
        $scope.quizs = Quiz.getCurrentQuiz();
    } else {
        $scope.quizs = Quiz.getCompletedQuiz();
    }
}

function QuizDetailCtrl($scope, $state, $stateParams, $ionicPopup, Quiz) {
    $scope.status = $stateParams.status;
    $scope.quizID = parseInt($stateParams.quizID);
    $scope.submission = Quiz.getSubmission($scope.uid);

    if ($scope.status == 'current') {
        $scope.quizs = Quiz.getCurrentQuiz();
    } else {
        $scope.quizs = Quiz.getCompletedQuiz();
    }

    // load the specific quiz question
    $scope.quizs.$loaded(function(res) {
        $scope.quiz = $scope.quizs[$scope.quizID];
    }).then(function() {
        $scope.submission.$loaded(function() {
            $scope.quiz.selection = $scope.submission[$scope.quiz.$id];
        });
    });


    $scope.submit = function() {
        var is_success = Quiz.submitQuiz($scope.quiz);
        if (!is_success) {
            $ionicPopup.alert({
                title: 'Error',
                template: 'You have already submitted your answer for this quiz',
                okType: 'button-assertive'
            });
            return;
        }
        // go to next question or quiz list
        if ($scope.quizID < $scope.quizs.length - 1) {
            $state.go('app.quizDetail', {
                status: $scope.status,
                quizID: $scope.quizID + 1
            });
        } else {
            $state.go('app.quizList', {
                status: $scope.status
            });
        }
    }
}
angular.module('everedu.QuizCtrl', ['everedu.CourseService'])
    .controller('QuizCtrl', QuizCtrl)
    .controller('QuizListCtrl', QuizListCtrl)
    .controller('QuizDetailCtrl', QuizDetailCtrl);