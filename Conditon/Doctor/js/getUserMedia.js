navigator.getWebcam = (
	navigator.getUserMedia ||
	navigator.webkitGetUserMedia ||
	navigator.mozGetUserMedia ||
	navigator.msGetUserMedia
);

navigator.getWebcam(
	{
	    video: true,
	    audio: true
	},
	function gotWebcam(stream) {
	    localVideo.src = window.URL.createObjectURL(stream);
	    localVideo.play();

	    var videoTrack = stream.getVideoTracks()[0];
	    var output = document.getElementById('output');
	    output.innerHTML = "Stream Id =" + stream.id + "<br/>"
	    output.innerHTML += "track readState=" + videoTrack.readyState + "<br/>"
	    output.innerHTML += "track id=" + videoTrack.id + "<br/>"
	    output.innerHTML += "kind=" + videoTrack.kind + "<br/>"
	},
	function (err) {
	    console.log("Oops! something went wrong, " + err);
	}
	);