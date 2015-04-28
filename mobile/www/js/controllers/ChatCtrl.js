/**
 * everedu.ChatCtrl Module
 *
 * Description
 * define ChatCtrl
 */

function ChatCtrl($scope, $ionicScrollDelegate, Chat) {
    $scope.chat = Chat();

    // scoll to the bottom of screen when chat loaded
    $scope.chat.$loaded(function(){
        $ionicScrollDelegate.scrollBottom(true);
    })

    /**
     * Send out a message and scoll to the bottom
     */
    $scope.sendMessage = function() {
        $scope.chat.$add({
            name: $scope.profile.name,
            message: $scope.message
        });

        $scope.message = '';
        $ionicScrollDelegate.scrollBottom(true);
    }
}


angular.module('everedu.ChatCtrl', ['everedu.CourseService'])
    .controller('ChatCtrl', ChatCtrl);