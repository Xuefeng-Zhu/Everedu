/**
 * everedu.PresentCtrl Module
 *
 * Description
 * define PresentCtrl
 */
angular.module('everedu.PresentCtrl', [])
// controller used to manage addentance page
.controller('PresentCtrl', ['$scope', 'Presentation', 'Chat',
    function($scope, Presentation, Chat) {
        $scope.requests = Presentation.getRequests();
        $scope.chat = Chat(10);
        $scope.message = {
            content: ''
        }

        $scope.requests.$loaded(function(){
            angular.forEach($scope.requests, function(value) {
                if (value.state == 'p') {
                    $scope.presenting = true;
                }
            })
        })

        $scope.acceptRequest = function(request) {
            request.state = 'p';
            $scope.requests.$save(request);

            $scope.presenting = true;
        }

        $scope.deleteRequest = function(request) {
            $scope.requests.$remove(request);
        }

        /**
         * Send out a message and scoll to the bottom
         */
        $scope.sendMessage = function() {
            $scope.message.name = $scope.profile.name;
            $scope.chat.$add($scope.message);
            $scope.message.content = '';
        }

        startPresentation();
    }
])

var webrtc;
var presenting = false;

function startPresentation() {
    // code from https://github.com/HenrikJoreteg/SimpleWebRTC
    if (webrtc != null) {
        webrtc.joinRoom('everedu');
        return;
    }

    webrtc = new SimpleWebRTC({
        remoteVideosEl: 'remoteVideos',
        autoRequestMedia: true,
        url: 'everedu-webrtc.herokuapp.com:80'
    });
    // wait until webrtc is ready
    webrtc.on('readyToCall', function() {
        webrtc.joinRoom('everedu');
    });
}