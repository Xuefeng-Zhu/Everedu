/**
 * everedu.PresentCtrl Module
 *
 * Description
 * define PresentCtrl
 */

/**
 * Define the behavior for user have a presentation
 */
function PresentCtrl($scope, Presentation) {
    var webrtc = null;
    $scope.request = {
        state: 'i',
    }

    /**
     * Send a presentation request
     */
    $scope.requestPresetation = function() {
        $scope.request.state = 'w';
        $scope.request.name = $scope.profile.name;
        $scope.request = Presentation.pushRequest($scope.request);
    }

    /**
     * Cancel the presentation request
     */
    $scope.cancelRequest = function() {
        $scope.request.$remove();
        $scope.request = {
            state: 'i',
        }
    }

    /**
     * Finish Presentation and leave the room
     */
    $scope.finishPresentation = function() {
        webrtc.stopLocalVideo();
        webrtc.leaveRoom();
        $scope.cancelRequest();
    }

    // watch the request state for value modification
    $scope.$watch('request.state', function(newValue, oldValue) {

        // stop presentation if request is deleted 
        if (newValue == undefined && (oldValue == 'w' || oldValue == 'p')) {
            if (oldValue == 'p') {
                webrtc.stopLocalVideo();
                webrtc.leaveRoom();
            }

            $scope.request = {
                state: 'i'
            }
        }

        // start presentation if state changed to p
        if (newValue == 'p') {
            startPresent();
        }
    })

    /**
     * Create webrtc and join the room
     */
    function startPresent() {

        // if the webrtc has been created, just join the room
        if (webrtc != null) {
            webrtc.joinRoom('everedu');
            webrtc.startLocalVideo();
            return;
        }

        webrtc = new SimpleWebRTC({
            // code from https://github.com/HenrikJoreteg/SimpleWebRTC
            localVideoEl: 'localVideo',
            autoRequestMedia: true,
            url: 'everedu-webrtc.herokuapp.com'
        });

        // wait until webrtc is ready
        webrtc.on('readyToCall', function() {
            webrtc.joinRoom('everedu');
        });
    }
}


angular.module('everedu.PresentCtrl', [])
    .controller('PresentCtrl', PresentCtrl)