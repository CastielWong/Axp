var map;

function initMap() {
	// Create a map object and specify the DOM element for display.
    map = new google.maps.Map(document.getElementById('map'), {
    	center: {lat: -34.9271606, lng: 138.5997029},
    	scrollwheel: false,
    	zoom: 14
    });

    var location = {
		lat: -34.919980, 
		lng: 138.608960
	};
    addMarker(location);
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
 
function load(json, iconName) {
    loadJSON(json, function(response) {
        var actual_JSON = JSON.parse(response);

	    for(i = 0; i < 50; i++) {
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

