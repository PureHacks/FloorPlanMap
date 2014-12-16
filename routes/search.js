var express = require('express'),
	router = express.Router(),
	Q = require('q'),
	Employee = require('../models/employee.js'),
	POI = require('../models/poi.js');

function searchModel(model, query){
	var d = Q.defer();
	model.textSearch(query, function(err, result) {
		d.resolve(result);
	});
	return d.promise;
};


router.get('/:searchQuery', function(req, res, next){

	var allPromises = Q.all([ searchModel(Employee, req.params.searchQuery), searchModel(POI, req.params.searchQuery) ]),
		mergedResult = {
			results: []
		};

	Q.allSettled(allPromises).then(function(results){
		results.forEach(function (result) {
	        if (result.state === "fulfilled") {
	        	result.value.results.forEach(function(item){
	        		mergedResult.results.push(item);
	        	});
	        }
	    });
	    mergedResult.items = mergedResult.results.length;
	    res.send(mergedResult);
	});

});

module.exports = router;