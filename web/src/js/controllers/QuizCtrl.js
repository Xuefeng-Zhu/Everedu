/**
 * everedu.QuizCtrl Module
 *
 * Description
 */
angular.module('everedu.QuizCtrl', [])
    .controller('QuizCtrl', ['$scope', '$modal',
        function($scope, $modal) {
            $scope.search = {};
            $scope.currentQuiz = $scope.completedQuiz = [{
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
                completed: false
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

        }
    ])
    .controller('CreateQuizCtrl', ['$scope', '$modalInstance',
        function($scope, $modalInstance) {
            $scope.$modalInstance = $modalInstance;

            $scope.quiz = {
                choices: []
            };

            $scope.addChoice = function() {
                $scope.quiz.choices.push({content: ""});
                console.log($scope.quiz);
            }

            $scope.create = function() {
                $modalInstance.close($scope.quiz);
            }
        }
    ])