function QuizCtrl($scope) {
    $scope.currentQuiz = 5;
    $scope.completedQuiz = 10;
}

function QuizListCtrl($scope) {
    $scope.quizs = [{
        question: "What is result of 1+1?"
    }];
    for (var i = 0; i < 10; i++) {
        $scope.quizs.splice(0, 0, angular.copy($scope.quizs[0]));
    }
}

function QuizDetailCtrl($scope) {
    $scope.quiz = {
        question: "What is result of 1+1?",
        choices: ["2", "3", "4", "5"]
    };

}

angular.module('everedu.QuizCtrl', [])
    .controller('QuizCtrl', QuizCtrl)
    .controller('QuizListCtrl', QuizListCtrl)
    .controller('QuizDetailCtrl', QuizDetailCtrl);