/**
 * everedu.QuizCtrl Module
 *
 * Description
 * The controllers used to manage quiz state interface
 */
angular.module('everedu.QuizCtrl', [])
// controller used to control the most part of quiz page
.controller('QuizCtrl', ['$scope', '$modal', 'Quiz',
    function($scope, $modal, Quiz) {
        $scope.search = {};
        $scope.currentQuiz = Quiz.getCurrentQuiz();
        $scope.completedQuiz = Quiz.getCompletedQuiz();

        $scope.chartLabels = ['A', 'B', 'C', 'D'];
        $scope.chartData = [[11, 12, 14, 20]];

        /**
         * @name openQuizModal
         * @desc Open the modal used to create quiz, and push
         * the new quiz question to the current quiz list
         */
        $scope.openQuizModal = function() {
            var modal = $modal.open({
                templateUrl: 'QuizModal.html',
                controller: 'CreateQuizCtrl',
                size: 'lg'
            });

            modal.result.then(function(quiz) {
                $scope.currentQuiz.$add(quiz);
            });
        }

        /**
         * @name selectQuiz
         * @desc Select specific quiz question
         */
        $scope.selectQuiz = function(quiz) {
            $scope.selectedQuiz = quiz;
        }

        /**
         * @name toggleComplete
         * @desc Mark the quiz completed or uncomplted, and
         * put the quiz into matching quiz list
         */
        $scope.toggleComplete = function() {
            Quiz.removeQuiz($scope.selectedQuiz);
            $scope.selectedQuiz.completed = !$scope.selectedQuiz.completed;
            $scope.selectedQuiz = Quiz.addQuiz($scope.selectedQuiz);
        }

    }
])
// Controller used to create new quiz question
.controller('CreateQuizCtrl', ['$scope', '$modalInstance',
    function($scope, $modalInstance) {
        $scope.$modalInstance = $modalInstance;

        $scope.quiz = {
            choices: [],
            completed: false
        };

        /**
         * @name addChoice
         * @desc Add more choice into the quiz question
         */
        $scope.addChoice = function() {
            $scope.quiz.choices.push({
                content: ""
            });
        }

        /**
         * @name create
         * @desc Close the quiz modal and pass quiz object back to
         * parent
         */
        $scope.create = function() {
            $modalInstance.close($scope.quiz);
        }
    }
])