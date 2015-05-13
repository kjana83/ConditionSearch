function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initialize() {

    var lat = getParameterByName('lat');
    var lon = getParameterByName('lon');

    var data = "Sample";
    var title = "Title";


    var myLatlng = new google.maps.LatLng(lat, lon);
    var mapOptions = {
        center: new google.maps.LatLng(lat, lon),
        zoom: 8,
        mapTypeId: google.maps.MapTypeId.ROADMAP

    };
    var infoWindow = new google.maps.InfoWindow();
    var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
    var bluePin = new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/micons/blue-dot.png',
   new google.maps.Size(32, 32),
   new google.maps.Point(0, 0),
   new google.maps.Point(14, 35));
    var pinShadow = new google.maps.MarkerImage('http://maps.google.com/mapfiles/ms/micons/msmarker.shadow.png',
   new google.maps.Size(59, 32),
   new google.maps.Point(0, 0),
   new google.maps.Point(14, 35));
    var marker = new google.maps.Marker({
        position: myLatlng,
        icon: bluePin,
        shadow: pinShadow,
        map: map,
        title: title
    });
    (function (marker, data) {
        google.maps.event.addListener(marker, 'click', function (e) {
            infoWindow.setContent(data);
            infoWindow.open(map, marker);
        });
    })(marker, data);

}