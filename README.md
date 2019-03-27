# leaflet.ScaleFactor
Display a Scale Factor (e.g. 1:50,000) for Leaflet maps, checkout the [Demo](https://marcchasse.github.io/leaflet.ScaleFactor/).

Leaflet.ScaleFactor is based on [Leaflet's Control.Scale](http://leafletjs.com/reference.html#control-scale) and works with the latest version of Leaflet, [1.0.0-rc1](http://leafletjs.com/reference-1.0.0.html) it also likely works with older versions.

The calculation to determine the scale factor is approximate and could likely be improved further, as of right now its calculated as follows.

1. Find half the map height in pixels (middle of map)
2. Get Leaflet to determine the lat/long of (0,middle of map)
3. Get Leaflet to determine the lat/long of (100,middle of map)
4. Get Leaflet to calculate the real world distance in meters between the two points.
5. Get the pixels per physical screen millimeter
  1. Add a div with height:1mm; to the page
  2. Get calculated height in pixels by returning browser native `offsetHeight` attribute
6. Multiply 100px by the pixels/mm
7. Convert physical screen size of 100px from milimeters to meters
8. Divide real world meters per 100px by screen meters per 100px
9. Format and display the scale


## Quick Start

1. Create a leaflet map. Checkout Leaflets [Quick Start Guide](http://leafletjs.com/examples/quick-start.html) for a basic map example.

2. Include Leaflet.ScaleFactor.min.css and Leaflet.ScaleFactor.min.js

    ```html
    <link rel="stylesheet" type="text/css" href="https://rawgit.com/MarcChasse/leaflet.ScaleFactor/master/leaflet.scalefactor.min.css">
    <script src="https://rawgit.com/MarcChasse/leaflet.ScaleFactor/master/leaflet.scalefactor.min.js"></script>
    ```
3. Add the ScaleFactor control:
    ```javascript
    L.control.scalefactor().addTo(map);
    ```
## Complete Example
Here is everything you need to get this up and running. Copy and past the following to an `.html` file:
```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
	<title>Leaflet.ScaleFactor DEMO</title>
	<link rel="stylesheet" href="https://npmcdn.com/leaflet@1.0.0-rc.1/dist/leaflet.css" />
	<link rel="stylesheet" type="text/css" href="https://rawgit.com/MarcChasse/leaflet.ScaleFactor/master/leaflet.scalefactor.min.css">
	<style>html,body{margin:0;}#map{width:100vw;height:100vh;}</style>
</head>
<body>
	<div id="map"></div>
	<script src="https://npmcdn.com/leaflet@1.0.0-rc.1/dist/leaflet.js"></script>
	<script src="https://rawgit.com/MarcChasse/leaflet.ScaleFactor/master/leaflet.scalefactor.min.js"></script>
	<script>
	    osm = new L.TileLayer(
	    	'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	    	{attribution: 'Map data &copy; OpenStreetMap contributors'}
	    );

	    var map = L.map('map', {
	        center: [52.26869,-113.81034],
	        zoom: 18
	    });
		map.addLayer(osm);

		L.control.scalefactor().addTo(map);
	</script>
</body>
</html>
```
Checkout the [Demo](https://marcchasse.github.io/leaflet.ScaleFactor/)

## Options
`L.control.scalefactor`

| Option         | Type    | Default      | Description                                                                                     |
|----------------|---------|--------------|-------------------------------------------------------------------------------------------------|
| position       | String  | 'bottomleft' | The position of the control (one of the map corners). See control positions.                    |
| updateWhenIdle | Boolean | false        | If true, the control is updated on moveend, otherwise it's always up-to-date (updated on move). |
