(function () {
    angular.module('Patient', [])
      .controller('patientController', ['$scope', function ($scope) {
          $scope.PeerId = "Wait";
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
              $('#gpCall').attr('href', 'gpDoctor.html?id=' + peer.id);
              //$scope.PeerId = peer.id;
              console.log(peer.id);
              //$('#my-id').text(peer.id);
          });

          peer.on('call', function (call) {
              call.answer(window.localStream);
              if (window.existingCall) {
                  window.existingCall.close();
              }

              call.on('stream', function (stream) {
                  $('#their-video').prop('src', URL.createObjectURL(stream));
              });;
          });

          navigator.getWebcam({ video: true, audio: true },
            function (stream) {
                $("#my-video").prop('src', URL.createObjectURL(stream));

                window.localStream = stream;
                

            }, function (err) {
                console.log(err);
            });
     }]);
})();