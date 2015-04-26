/**
 * everedu.PresentCtrl Module
 *
 * Description
 * define PresentCtrl
 */
angular.module('everedu.PresentCtrl', [])
// controller used to manage addentance page
.controller('PresentCtrl', ['$scope',
    function($scope) {

        // code from https://github.com/HenrikJoreteg/SimpleWebRTC
        var webrtc = new SimpleWebRTC({
            remoteVideosEl: 'remoteVideos',
            autoRequestMedia: true,
            url: 'everedu-webrtc.herokuapp.com:80'
        });

        // wait until webrtc is ready
        webrtc.on('readyToCall', function() {
            webrtc.joinRoom('everedu');
        });
    }
])