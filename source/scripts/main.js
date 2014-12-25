/* global google */
'use strict';

var $ = require('jquery');
//var hdbr = require('handlebars');

var officeConciergeApp = {};

var isMapPage = typeof google !== "undefined";

(function(app) {

	if (!isMapPage){ return; }

	app.map = {};

	var MAP_CONTAINER_ID = "seating-map";
	var MAP_IMAGE_DIR = "/map-tiles/";
	var MAP_TILE_SIZE = {
		FLOOR_8 : [295, 342],
		FLOOR_9 : [303, 359]
	};

	app.map.utils = (function() {

		var latLongPixelProjection = {
			floor8 : {
				origin :  new google.maps.Point(MAP_TILE_SIZE.FLOOR_8[0] / 2, MAP_TILE_SIZE.FLOOR_8[1] / 2),
				pixelPerLng : MAP_TILE_SIZE.FLOOR_8[0] / 360,
				pixelPerLat : MAP_TILE_SIZE.FLOOR_8[1] / (2 * Math.PI)
			},
			floor9 : {
				origin :  new google.maps.Point(MAP_TILE_SIZE.FLOOR_9[0] / 2, MAP_TILE_SIZE.FLOOR_9[1] / 2),
				pixelPerLng : MAP_TILE_SIZE.FLOOR_9[0] / 360,
				pixelPerLat : MAP_TILE_SIZE.FLOOR_9[1] / (2 * Math.PI)
			}
		};

		var bound = function(value, optMin, optMax) {
			if (optMin != null) { value = Math.max(value, optMin); }
			if (optMax != null) { value = Math.min(value, optMax); }
			return value;
		};

		var degreesToRadians = function(deg) {
			return deg * (Math.PI / 180);
		};

		var getMapCoord = function(floor, latLong) {
			var mapCoord = new google.maps.Point(0, 0);

			if (!latLong instanceof google.maps.LatLng) { return mapCoord; }
			if (floor !== "8" && floor !== "9") { return mapCoord; }

			var projection = latLongPixelProjection["floor" + floor];

			mapCoord.x = projection.origin.x + latLong.lng() * projection.pixelPerLng;

			// Truncating to 0.9999 effectively limits latitude to 89.189. This is
			// about a third of a tile past the edge of the world tile.
			var sinY = bound(Math.sin(degreesToRadians(latLong.lat())), -0.9999,
      0.9999);
			mapCoord.y = projection.origin.y + 0.5 * Math.log((1 + sinY) / (1 - sinY)) * -projection.pixelPerLat;

			//console.log("***** mapCoord=",mapCoord);
			return mapCoord;
		};

		return {
			degreesToRadians : function(deg) {
				return degreesToRadians(deg);
			},
			getMapCoord : function(floor, latLong) {
				return getMapCoord(floor, latLong);
			}
		};
	})();	// end map.utils

	app.map.ui = (function() {

		var utils = app.map.utils;
		console.log(utils);

		var getFloor = function() {
			// get floor from URL, default to 9th floor
			return (/browse\/8/).test(window.location.href) ? "8" : "9";
		};

		var getTileCoord = function(coord, zoom) {
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


		var displaySeatingInfo = function(map) {
			console.log("**** zoom = ",map.getZoom());


		};

		var renderFloorMap = function(floor) {

			var myLatlng = new google.maps.LatLng(0, 0);
			var mapTypeId = floor + 'th-floor';
			var mapOptions = {
				backgroundColor: "ffffff",
				center: myLatlng,
				zoom: 0,
				streetViewControl: false,
				mapTypeControlOptions: {
					mapTypeIds: [mapTypeId]
				}
			};

			var floorMapOptions = {
				getTileUrl: function(coord, zoom) {
					var tileCoord = getTileCoord(coord, zoom);
					if (!tileCoord) {
						return null;
					}

					//console.log("****** zoom=",zoom," tileCoord=<",tileCoord.x,",",tileCoord.y,">");
					return MAP_IMAGE_DIR + floor + 'th_' + zoom + '_' + tileCoord.x + '_' + tileCoord.y + '.png';
				},
				tileSize: new google.maps.Size(MAP_TILE_SIZE["FLOOR_"+floor][0], MAP_TILE_SIZE["FLOOR_"+floor][1]),
				isPng: true,
				maxZoom: 2,
				minZoom: 0,
				name: mapTypeId
			};

			var floorMapType = new google.maps.ImageMapType(floorMapOptions);

			var theMap = new google.maps.Map(document.getElementById(MAP_CONTAINER_ID), mapOptions);
			theMap.mapTypes.set(mapTypeId, floorMapType);
			theMap.setMapTypeId(mapTypeId);


			/*
			var p1 = new google.maps.LatLng(0, 0);
			var p2 = new google.maps.LatLng(-50, -50);

			var c1 = utils.getMapCoord("9", p1);
			var c2 = utils.getMapCoord("9", p2);
			console.log("------------c1=",c1);
			console.log("------------c2=",c2);

			var m1 = new google.maps.Marker({
				position: p1,
				map: theMap,
				optimized: false,
				title: "<lat,lng>=<" + p1.lat() + "," + p1.lng() + ">  <x,y>=<" + c1.x + "," + c1.y + ">"
			});

			var m2 = new google.maps.Marker({
				position: p2,
				map: theMap,
				optimized: false,
				title: "<lat,lng>=<" + p2.lat() + "," + p2.lng() + ">  <x,y>=<" + c2.x + "," + c2.y + ">"
			});



			console.log(m1,m2);
			*/

			// start displaying people info at zoom 1+
			google.maps.event.addListener(theMap, 'zoom_changed', function() {
				displaySeatingInfo(theMap);
			});
		};

		return {
			mapTileSize : MAP_TILE_SIZE,
			renderSeatingMap : function() {
				var floor = getFloor();
				google.maps.event.addDomListener(window, 'load', function(){
					renderFloorMap(floor);
				});
			}
		};
	})();	// end map.ui

})(officeConciergeApp);


officeConciergeApp.api = (function(){

	var urls = {
		employee : "/api/employee/",
		poi : "/api/poi/"
	};

	return {
		getPeople : function(query, successCallback, failCallback) {
			$.ajax({
				url: urls.employee + query,
				dataType: "json"
			}).done(function(data) {
				if (typeof successCallback === "function") {
					successCallback(data);
				}
			}).fail(function() {
				if (typeof successCallback === "function") {
					failCallback();
				}
			});
		}
	};
})();

officeConciergeApp.ui = (function(app) {

	var cleanUpSearchTerm = function() {
		// lowercase, trim, & replace blank space with "-"
		// i.e. Tim Ludikar -> tim-ludikar
		var searchTerm = $("#search-term").val().toLowerCase();
		searchTerm = searchTerm.replace(/^\s+|\s+$/gm,'');
		searchTerm = searchTerm.replace(' ','-');

		return searchTerm;
	};

	var bindSearchEvent = function() {
		$(".search-area").find(".find-seat").on("click", function() {
			var searchTerm = cleanUpSearchTerm();

			if (searchTerm !== "") {
				window.location.href = "/seats/search/" + searchTerm;
			}
		});
	};

	var listPeople = function(data) {
		if (!data) { return; }
		
	};

	return {
		listPeople : function() {
			var searchTerm = cleanUpSearchTerm();
			app.api.getPeople(searchTerm, listPeople);
		},
		init : function() {
			bindSearchEvent();
		}
	};

})(officeConciergeApp);

$(document).ready(function(){
	officeConciergeApp.ui.init();

	if (officeConciergeApp.map) {
		officeConciergeApp.map.ui.renderSeatingMap();
		officeConciergeApp.ui.listPeople();
	}
});