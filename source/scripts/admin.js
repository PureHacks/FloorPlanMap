'use strict';

var $ = require('jquery'),
	ko = require('knockout');

$(function(){

	function employeeViewModel(data){
		var self = this;

		self.firstName = ko.observable(data.firstName);
		self.lastName = ko.observable(data.lastName);
		self.jobTitle = data.jobTitle;
		self.phoneExtension = data.phoneExtension;
		self.emailAddress = data.emailAddress;
		self.spotlightUrl = data.spotlightUrl;
		self.slug = data.slug;

		self.displayName = ko.computed(function(){
			return self.firstName() + " " + self.lastName();
		});
	};

	function employeesViewModel(){
		var self = this;
		self.employeeList = ko.observableArray([]);
		self.selected = ko.observable({});

		function clearForm(){
			$("form")[0].reset();
			self.selected({});
		};

		self.load = function(){
			$.ajax({
				url: '/api/employee/',
				type: 'GET',
				success: function(data){
					$.each(data, function(n, item){
						self.employeeList.push(new employeeViewModel(item));
					});
				}
			});
		};

		self.save = function(){
			$.ajax({
				url: '/api/employee/',
				type: 'POST',
				data: $("form").serialize(),
				success: function(data){
					self.employeeList.push(new employeeViewModel(data));
					self.flashMessage({type: "alert-success", message: "Employee Created"});
					clearForm();
				}
			});
		};

		self.selectEmployee = function(){
			self.flashMessage({});
			self.selected(this);
		};

		self.createEmployee = function(){
			self.selected(new employeeViewModel({}));
		};

		self.removeEmployee = function(employee){
			var remove = employee.selected();

			$.ajax({
				url: '/api/employee/' + remove.slug,
				type: 'DELETE',
				success: function(data){
					self.employeeList.remove(remove);
					self.flashMessage({type: "alert-success", message: "Employee Deleted"});
					clearForm();
				}
			});
		};

		self.flashMessage = ko.observable({});

		self.updateEmployee = function(employee){
			var update = employee.selected();

			$.ajax({
				url: '/api/employee/' + update.slug,
				type: 'POST',
				data: $("form").serialize(),
				success: function(data){
					self.flashMessage({type: "alert-success", message: "Employee Updated"});
				}
			});
		};
	};

	$(document).ready(function(){
		var viewModel = new employeesViewModel();
		ko.applyBindings(viewModel);
		viewModel.load();
	});

});
