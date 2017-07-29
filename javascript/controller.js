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

function getData() {
	var mydata = JSON.parse("test.json");
	// console.log(mydata);
	alert(mydata[0].name);
}

function print(){
	alert("aaaaa");
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
 

function load(json) {
    loadJSON(json, function(response) {
        var actual_JSON = JSON.parse(response);
        console.log(actual_JSON);
    });
    
    
}