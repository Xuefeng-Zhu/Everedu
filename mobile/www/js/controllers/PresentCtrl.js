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
        var webrtc = null;
        $scope.request = {
            state: 'i',
        }

        $scope.requestPresetation = function() {
            $scope.request.state = 'w';
            $scope.request.name = $scope.profile.name;
            $scope.request = Presentation.pushRequest($scope.request);
        }

        $scope.cancelRequest = function() {
            $scope.request.$remove();
            $scope.request = {
                state: 'i',
            }
        }

        $scope.finishPresentation = function() {
            webrtc.stopLocalVideo();
            webrtc.leaveRoom();
            $scope.cancelRequest();
        }

        $scope.$watch('request.state', function(newValue, oldValue) {
            if (newValue==undefined && (oldValue=='w' || oldValue=='p')){
                if (oldValue == 'p') {
                    webrtc.stopLocalVideo();
                    webrtc.leaveRoom();
                }

                $scope.request = {
                    state: 'i'
                }
            }

            if (newValue == 'p') {
                startPresent();
            }
        })

        function startPresent() {
            if (webrtc != null) {
                webrtc.joinRoom('everedu');
                webrtc.startLocalVideo();
                return;
            }

            webrtc = new SimpleWebRTC({
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