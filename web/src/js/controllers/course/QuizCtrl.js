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

        $scope.chartData = [];
        // check if a quiz question gets selected 
        $scope.$watch('selectedQuiz.question', function() {
            if ($scope.selectedQuiz == undefined) return;
            var charCode = 'A'.charCodeAt();
            $scope.chartLabels = [];
            $scope.chartData[0] = [];
            angular.forEach($scope.selectedQuiz.result, function(value, key) {
                $scope.chartLabels.push(String.fromCharCode(charCode + key));
                $scope.chartData[0].push(value);
            });

            watchResult();
        });

        /**
         * @name watchResult
         * @desc update the chart data if quiz result updates
         */
        function watchResult() {
            $scope.$watch('selectedQuiz.result', function(resultValue) {
                angular.forEach(resultValue, function(value, key){
                    $scope.chartData[0][key] = value;
                })
            })
        }

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
            result: [],
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
            $scope.quiz.result.push(0);
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