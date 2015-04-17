/**
 * everedu.QuizCtrl Module
 *
 * Description
 */
angular.module('everedu.QuizCtrl', [])
    .controller('QuizCtrl', ['$scope',
        function($scope) {
        	$scope.search = {}; 
            $scope.currentQuiz = $scope.completedQuiz = [{
                question: "What is 1+1?",
                choices: ["2", "3", "4", "5"]
            }, {
                question: "Do you know the result of 2+1?",
                choices: ["2", "3", "4", "5"]
            }];

        }
    ])