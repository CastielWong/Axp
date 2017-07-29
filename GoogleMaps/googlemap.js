/**
 * Created by jinleiw on 29/7/17.
 */
function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 4,
        center: uluru
    });
    addMarker(uluru, map);
}

function addMarker(location, map) {
    var marker = new google.maps.Marker({
        position: location,
        map: map
    });
}

function load() {
    var mydata = JSON.parse(Information);
    alert(mydata.results);
}