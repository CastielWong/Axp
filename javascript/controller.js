var map;
var directionsService;
var directionsDisplay;

function initMap() {
    // Create a map object and specify the DOM element for display.
    // directionsService = new google.maps.DirectionsService;
    // directionsDisplay = new google.maps.DirectionsRenderer();

    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.9271606, lng: 138.5997029},
        scrollwheel: false,
        zoom: 14
    });

    load("data/attraction.json", "camera.png", 10);

    // directionsDisplay.setMap(map);
}

function addMarker(location) {
    var marker = new google.maps.Marker({
        position: location,
        icon: "images/icons/hospital.png",
        animation: google.maps.Animation.DROP,
        map: map
    })
}


function loadJSON(file, callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', file, true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}


function load(json, iconName, size) {
    loadJSON(json, function (response) {
        var actual_JSON = JSON.parse(response);
        for (i = 0; i < 50; i++) {
            var temp = {
                name: actual_JSON[i].name,
                lat: actual_JSON[i].lat,
                lng: actual_JSON[i].lon
            };
            var marker = new google.maps.Marker({
                position: temp,
                icon: "images/icons/" + iconName,
                animation: google.maps.Animation.DROP,
                map: map
            })
        }
    });
}

function testing() {
    // alert("aa");
    loadJSON("data/attractionjson.json", function (response) {
        var actual_JSON = JSON.parse(response);
        var start = {lat: -34.9271606, lon: 138.5997029};
        var ends = [];
        for (var i = 0; i < 5; i++) {
            ends.push(actual_JSON[i]);
        }
        calculateAndDisplayRoute(directionsService, directionsDisplay, start, ends);
    })
}

function calculateAndDisplayRoute(directionsService, directionsDisplay, startLocation, endLocations) {
    var start = new google.maps.LatLng(startLocation.lat, startLocation.lon);

    var terminals = [];

    for (var i = 0; i < endLocations.length - 1; i++) {
        terminals.push(new google.maps.LatLng(endLocations[i].lat, endLocations[i].lon));
    }
    var end = new google.maps.LatLng(endLocations[endLocations.length - 1].lat, endLocations[endLocations.length - 1].lon);
    var waypts = [];

    for (var i = 0; i < terminals.length; i++) {
        var value = terminals[i];
        waypts.push({
            location: value,
            stopover: true
        });
    }

    directionsService.route({
        origin: start,
        destination: end,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'WALKING'
    }, function (response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

function sortjson(file) {
    loadJSON(file, function (response) {
        var actual_JSON = JSON.parse(response);
        // console.log("original");
        for (var i = 0; i < actual_JSON.length; i++) {
            console.log(actual_JSON[i].lat + ' ' + actual_JSON[i].lon);
        }
        actual_JSON.sort(predicateBy());
        // console.log("after");
        for (var i = 0; i < actual_JSON.length; i++) {
            console.log(actual_JSON[i].lat + ' ' + actual_JSON[i].lon);
        }
        return actual_JSON;
    })
}

function predicateBy() {
    var lat = -34.9227912;
    var lon = 138.5916719;
    return function (a, b) {
        var alength = (a.lat - lat) * (a.lat - lat) + (a.lon - lon) * (a.lon - lon);
        var blength = (b.lat - lat) * (b.lat - lat) + (b.lon - lon) * (b.lon - lon);

        if (alength > blength) {
            return 1;
        } else if (alength < blength) {
            return -1;
        }
        return 0;
    }
}

function geolocate(iconName) {
	var geoSuccess = function(position) {
		map.setZoom(16);

		var pos = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			// infoWindow = new google.maps.InfoWindow;
			// infoWindow.setPosition(pos);
			// infoWindow.setContent('You’re HERE!');
			// infoWindow.open(map);

			map.setCenter(pos);
			var marker = new google.maps.Marker({
				position: pos,
				icon: "images/icons/" + iconName,
				animation: google.maps.Animation.DROP,
				map: map
			}) 
			load("data/wifi.json", "wifi.png", 50);
	}

	var geoError = function(error){
		console.log('Error occurred. Error code: ' + error.code);
		console.log('Error occurred. Error: ' + error);
		alert(error.code + ": " + error.message);
	};

	navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}

// function setValue(num) {
// 	console.log("sss");
// 	sessionStorage.setItem('label', num);
// }

// function getValue() {
// 	var a =	sessionStorage.getItem('label');
// 	console.log(a);
// }

// function setValues(category, icon) {
// 	sessionStorage.setItem('category', category);
// 	sessionStorage.setItem('icon', icon);
// }

// function getValues() {
// 	var a =	sessionStorage.getItem('category');
// 	console.log(a);
	
// 	var b = sessionStorage.getItem('icon');
// 	console.log(b);
// }
