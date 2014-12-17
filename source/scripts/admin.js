'use strict';

var $ = require('jquery');

var adminEmployees = (function(){
	
	var baseApiUrl = "/api/employee";
	
	var getAllEmployees = function() {
		return baseApiUrl;
	};
	
	return {
		init : function() {
			getAllEmployees();
		}
	};
})();

$(document).ready(function(){
	adminEmployees.init();
});