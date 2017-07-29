function initMap() {
	// Create a map object and specify the DOM element for display.
    var map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: -34.9271606, lng: 138.5997029},
    	scrollwheel: false,
    	zoom: 14
    });

    addMarkers(map);
}

function addMarkers(map) {
	var some = {
		lat: -34.919980, 
		lng: 138.608960
	};
	var marker = new google.maps.Marker({
		position: some,
		icon: "images/icons/hospital.png",
		animation: google.maps.Animation.DROP,
		map: map
	})
}