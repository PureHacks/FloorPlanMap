/* global google */
'use strict';

var $ = require('jquery');

var isMapPage = typeof google !== "undefined";

var mapUI = isMapPage ? (function() {
	
	var MAP_CONTAINER_ID = "seating-map";
	var MAP_IMAGE_DIR = "/map-tiles/";
	var MAP_TILE_SIZE = {
		"floor-8" : [295, 342],
		"floor-9" : [303, 359]
	};
	
	var getFloor = function() {
		// get floor from URL, default to 9th floor
		return (/browse\/8/).test(window.location.href) ? "8" : "9";
	};
	
	var getNormalizedCoord = function(coord, zoom) {
		var y = coord.y;
		var x = coord.x;
		
		// zoom 0 = 1x1 tile; zoom 1 = 2x2 tiles; zoom 2 = 3x3 tiles
		var tileRange = zoom + 1;
		
		// don't repeat across y-axis (vertically)
		if (y < 0 || y >= tileRange) {
			return null;
		}
		
		// don't repeat across x-axis (horizontally)
		if (x < 0 || x >= tileRange) {
			return null;
		}
		
		return {
			x: x,
			y: y
		};
	};
	
	var renderFloorMap = function(floor) {
		
		var myLatlng = new google.maps.LatLng(0, 0);
		var mapTypeId = floor + 'th-floor';
		var mapOptions = {
			center: myLatlng,
			zoom: 0,
			streetViewControl: false,
			mapTypeControlOptions: {
				mapTypeIds: [mapTypeId]
			}
		};
		
		var floorMapOptions = {
			getTileUrl: function(coord, zoom) {
				var normalizedCoord = getNormalizedCoord(coord, zoom);
				if (!normalizedCoord) {
					return null;
				}
				
				//console.log("****** zoom=",zoom," normalizedCoord=<",normalizedCoord.x,",",normalizedCoord.y,">");
				return MAP_IMAGE_DIR + floor + 'th_' + zoom + '_' + normalizedCoord.x + '_' +
				normalizedCoord.y + '.png';
			},
			tileSize: new google.maps.Size(MAP_TILE_SIZE["floor-"+floor][0], MAP_TILE_SIZE["floor-"+floor][1]),
			isPng: true,
			maxZoom: 2,
			minZoom: 0,
			name: mapTypeId
		};
		
		var floorMapType = new google.maps.ImageMapType(floorMapOptions);
		
		var theMap = new google.maps.Map(document.getElementById(MAP_CONTAINER_ID), mapOptions);
		theMap.mapTypes.set(mapTypeId, floorMapType);
		theMap.setMapTypeId(mapTypeId);
	};
	
	return {
		renderSeatingMap : function() {
			var floor = getFloor();
			google.maps.event.addDomListener(window, 'load', function(){
				renderFloorMap(floor);
			});
		}
	};
})() : {};

var officeConciergeApp = (function() {

	var bindSearchEvent = function() {
		$(".search-area").find(".find-seat").on("click", function() {
			var searchTerm = $("#search-term").val();
			
			if (searchTerm.replace(/^\s+|\s+$/gm,'') !== "") {
				window.location.href = "/seats/search/" + searchTerm;
			}
		});
	};
	
	return {
		init : function() {
			bindSearchEvent();
		}
	};
	
})();

$(document).ready(function(){
	officeConciergeApp.init();
	
	if (isMapPage) {
		mapUI.renderSeatingMap();
	}
});