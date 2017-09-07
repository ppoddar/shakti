var map; /** must be in global scope */
var apiKey = 'AIzaSyA9TixZW8Bl7MiG97-cpaquH6dFx2MEQzU';
function initMap() {
	var point = new google.maps.LatLng(24.4592707,88.0814947)
	var $mapDiv = document.getElementById('map')
	console.log('initMap ' + $mapDiv.id)
	var map = new google.maps.Map($mapDiv, {
		zoom:4,
		center:point
	})

	var marker = new google.maps.Marker({
		position: point,
		map: map,
		title: 'Baharu, West Bengal',
	});
}

