(function () {
    angular.module('GP', [])
        .service('gpService', ['$http', function ($http) {
            return {
                sendMail: function (mailId) {
                    return $http.get('/api/SendMail/?recipient=' + mailId)
                    .success(function (data, status) {
                        return data;
                    });
                }
            };
        }])
    .controller('gpController', ['$scope', 'gpService', function ($scope, gpService) {
        $scope.SendMail = function () {
            gpService.sendMail($scope.email);
            $scope.file = '';
            $scope.email = '';
            $scope.diag = '';
        };
        
        navigator.getWebcam = (
                     navigator.getUserMedia ||
                     navigator.webkitGetUserMedia ||
                     navigator.mozGetUserMedia ||
                     navigator.msGetUserMedia
                 );

        var peer = new Peer({
            key: 'zurreip758eel8fr',
            debug: 3,
            config: {
                'iceServers': [
                    { url: 'stun:stun.l.google.com:19302' },
                    { url: 'stun:stun1.l.google.com:19302' },
                    { url: 'turn:homeo@turn.bistri.com:80', credential: 'homeo' }]
            }
        });

        peer.on('open', function () {
            $scope.PeerId = peer.id;
            console.log(peer.id);
            //$('#my-id').text(peer.id);
        });

        function invoke(call) {
            if (window.existingCall) {
                window.existingCall.close();
            }

            call.on('stream', function (stream) {
                $('#their-video').prop('src', URL.createObjectURL(stream));
            });
        }

        peer.on('call', function (call) {
            call.answer(window.localStream);
            invoke(call);
        });


        function getUrlVars() {
            var vars = [], hash;
            var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
            for (var i = 0; i < hashes.length; i++) {
                hash = hashes[i].split('=');
                vars.push(hash[0]);
                vars[hash[0]] = hash[1];
            }
            return vars;
        }

        navigator.getWebcam({ video: true, audio: true },
          function (stream) {
              $("#my-video").prop('src', URL.createObjectURL(stream));

              window.localStream = stream;

              if (getUrlVars()['id']) {
                  var call = peer.call(getUrlVars()['id'], window.localStream);
                  invoke(call);
              }

          }, function (err) {
              console.log(err);
          });
    }]);
})();