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
        $scope.stateText = {
            i: 'I Want To Present!',
            w: 'Please Wait For Instructor\'s Proval.',
            p: 'Finish Presentation.'
        }

        $scope.request = {
            state: 'i',
        }

        startPresent()
        function startPresent() {
            var webrtc = new SimpleWebRTC({
                // code from https://github.com/HenrikJoreteg/SimpleWebRTC
                localVideoEl: 'localVideo',
                autoRequestMedia: true,
                url: 'everedu-webrtc.herokuapp.com:80'
            });

            // wait until webrtc is ready
            webrtc.on('readyToCall', function() {
                webrtc.joinRoom('everedu');
            });
        }
    }
])