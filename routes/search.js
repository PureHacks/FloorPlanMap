var express = require('express'),
	router = express.Router(),
	Employee = require('../models/employee.js');

router.get('/:searchQuery', function(req, res, next){
	Employee.textSearch(req.params.searchQuery, function(err, employees){
		res.send(employees);
	});
});

module.exports = router;