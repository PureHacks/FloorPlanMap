'use strict';

var $ = require('jquery');

var digitalSeatingPlan = (function() {

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
	digitalSeatingPlan.init();
});