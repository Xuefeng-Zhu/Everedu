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

function QuizDetailCtrl($scope, $state, $stateParams, Quiz) {
    $scope.status = $stateParams.status;
    $scope.quizID = parseInt($stateParams.quizID);

    if ($scope.status == 'current') {
        $scope.quizs = Quiz.getCurrentQuiz();
    } else {
        $scope.quizs = Quiz.getCompletedQuiz();
    }

    $scope.quizs.$loaded(function(res){
        $scope.quiz = $scope.quizs[$scope.quizID];
    })
    

    $scope.submit = function() {
        Quiz.submitQuiz($scope.quiz);
        if ($scope.quizID < $scope.quizs.length-1){
            $state.go('app.quizDetail', {status: $scope.status, quizID: $scope.quizID+1});
        } else {
            $state.go('app.quizList', {status: $scope.status});
        }
    }
}

angular.module('everedu.QuizCtrl', ['everedu.CourseService'])
    .controller('QuizCtrl', QuizCtrl)
    .controller('QuizListCtrl', QuizListCtrl)
    .controller('QuizDetailCtrl', QuizDetailCtrl);