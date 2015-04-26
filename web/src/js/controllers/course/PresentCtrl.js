/**
 * everedu.PresentCtrl Module
 *
 * Description
 * define PresentCtrl
 */
angular.module('everedu.PresentCtrl', [])
// controller used to manage addentance page
.controller('PresentCtrl', ['$scope', 'Presentation',
    function($scope, Presentation) {
        $scope.requests = Presentation.getRequests();

        $scope.acceptRequest = function(request) {
            request.state = 'p';
            $scope.requests.$save(request);
        }

        $scope.deleteRequest = function(request) {
            $scope.requests.$remove(request);
        }

        startPresentation();
    }
])

var webrtc;

function startPresentation() {
    // code from https://github.com/HenrikJoreteg/SimpleWebRTC
    if (webrtc != null) return;
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