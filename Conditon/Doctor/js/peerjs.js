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
    $('#my-id').text(peer.id);
});

peer.on('call', function (call) {
    call.answer(window.localStream);
    step3(call);
});

$(function () {
    $('#make-call').click(function () {
        var call = peer.call($('#callto-id').val(), window.localStream);
        step3(call);
    });
    $('#end-call').click(function () {
        window.existingCall.close();
        step2();
    })
    $('#step1-retry').click(function () {
        step1();
    });
    step1();
});

function step1() {
    navigator.getWebcam(
        { video: true, audio: false },
    function (stream) {
        $("#my-video").prop('src', URL.createObjectURL(stream));

        window.localStream = stream;
        if (getUrlVars()['id']) {
            var call = peer.call(getUrlVars()['id'], window.localStream);
            step3(call);
        }

        step2();
    }, function (err) {
        console.log(err);
    });
}

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

function step2() {
    $('#step1', '#step3').hide();
    $('#step2').show();
}

function step3(call) {
    if (window.existingCall) {
        window.existingCall.close();
    }

    call.on('stream', function (stream) {
        $('#their-video').prop('src', URL.createObjectURL(stream));
    });
    $('#step1', '#step2').hide();
    $('#step3').show();
}