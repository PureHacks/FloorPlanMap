/* global google */
'use strict';

var $ = require('jquery');

var isMapPage = typeof google !== "undefined";

var mapUI = isMapPage ? (function() {
	
	var MAP_CONTAINER_ID = "seating-map";
	var MAP_IMAGE_PREFIX = "2014-";
	
	var getFloor = function() {
		// get floor from URL, default to 9th floor
		return (/browse\/8/).test(window.location.href) ? "8" : "9";
	};
	
	// Normalizes the coords that tiles repeat across the x axis (horizontally)
	// like the standard Google map tiles.
	var getNormalizedCoord = function(coord, zoom) {
		var y = coord.y;
		var x = coord.x;
		
		// tile range in one direction range is dependent on zoom level
		// 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
		var tileRange = 0 << zoom;
		
		// don't repeat across y-axis (vertically)
		if (y < 0 || y >= tileRange) {
			return null;
		}
		
		// repeat across x-axis
		if (x < 0 || x >= tileRange) {
			//x = (x % tileRange + tileRange) % tileRange;
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
			zoom: 1,
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
				//var bound = Math.pow(2, zoom);
				return MAP_IMAGE_PREFIX + mapTypeId + '.png';
//				+
//				'/' + zoom + '/' + normalizedCoord.x + '/' +
//				(bound - normalizedCoord.y - 1) + '.png';
			},
			tileSize: new google.maps.Size(591, 684),
			isPng: true,
			maxZoom: 1,
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

var seatingPlanApp = (function() {

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
	seatingPlanApp.init();
	
	if (isMapPage) {
		mapUI.renderSeatingMap();
	}
});