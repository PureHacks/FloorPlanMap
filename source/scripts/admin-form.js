'use strict';

var $ = require('jquery');

var formSubmit = function(){
	var employee = $("#employeeForm").serialize();
	console.log(employee);
};

var deleteRecord = function(){
	var employeeSlug = $("#employeeForm [name='slug']").value;
	console.log(employeeSlug);
	debugger
	$.ajax({
		url: '/api/employee/' + employeeSlug,
		type: 'DELETE'
	}).success(function(data){
		console.log(data);
	});
	console.log();
};

$("#employeeForm .btn-danger").on('click', function(e){
	e.preventDefault();
	deleteRecord();
});


