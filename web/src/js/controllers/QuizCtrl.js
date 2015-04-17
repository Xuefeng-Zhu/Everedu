/**
 * everedu.QuizCtrl Module
 *
 * Description
 */
angular.module('everedu.QuizCtrl', [])
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

            $scope.selectQuiz = function(quiz) {
                $scope.selectedQuiz = quiz;
            }

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
            	console.log($scope.currentQuiz);
            }

        }
    ])
    .controller('CreateQuizCtrl', ['$scope', '$modalInstance',
        function($scope, $modalInstance) {
            $scope.$modalInstance = $modalInstance;

            $scope.quiz = {
                choices: [],
                completed: false
            };

            $scope.addChoice = function() {
                $scope.quiz.choices.push({
                    content: ""
                });
                console.log($scope.quiz);
            }

            $scope.create = function() {
                $modalInstance.close($scope.quiz);
            }
        }
    ])