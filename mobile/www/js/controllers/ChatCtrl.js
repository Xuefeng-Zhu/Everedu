/**
 * everedu.ChatCtrl Module
 *
 * Description
 * define ChatCtrl
 */

function ChatCtrl($scope, $ionicScrollDelegate, Chat) {
    $scope.chat = Chat();

    $scope.chat.$loaded(function(){
        $ionicScrollDelegate.scrollBottom(true);
    })

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