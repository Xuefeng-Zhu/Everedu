/**
 * everedu.QuizCtrl Module
 *
 * Description
 * The controllers used to manage quiz state interface
 */
angular.module('everedu.QuizCtrl', [])
	// controller used to control the most part of quiz page
    .controller('QuizCtrl', ['$scope', '$modal',
        function($scope, $modal) {
            $scope.search = {};
            $scope.completedQuiz = [];
            $scope.currentQuiz = [{
                question: "What is 1+1?",
                choices: [{
                    content: "2"
                }, {
                    content: "3"
                }, {
                    content: "4"
                }, {
                    content: "5"
                }],
                answer: 2,
                completed: false,
            }, {
                question: "Do you know the result of 2+1?",
                choices: [{
                    content: "2"
                }, {
                    content: "3"
                }, {
                    content: "4"
                }, {
                    content: "5"
                }],
                answer: 3,
                completed: false
            }];

            $scope.columnChart = {};
            $scope.columnChart.data = [
                ['Choice', 'Count'],
                ['A', 50],
                ['B', 20],
                ['C', 5],
                ['D', 10]
            ];;

            $scope.columnChart.type = 'ColumnChart';

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
                    $scope.currentQuiz.push(quiz);
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
            	if ($scope.selectedQuiz.completed) {
            		var index = $scope.completedQuiz.indexOf($scope.selectedQuiz);
            		$scope.completedQuiz.splice(index, 1);
            		$scope.currentQuiz.push($scope.selectedQuiz);
            	} else {
            		var index = $scope.currentQuiz.indexOf($scope.selectedQuiz);
            		$scope.currentQuiz.splice(index, 1);
            		$scope.completedQuiz.push($scope.selectedQuiz);

            	}
            	$scope.selectedQuiz.completed = !$scope.selectedQuiz.completed;
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
                console.log($scope.quiz);
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