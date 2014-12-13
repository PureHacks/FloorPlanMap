var express = require('express'),
	router = express.Router(),
	Employee = require('models/employee');


router.post('/', function(req, res, next){
	var employee = new Employee({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		jobTitle: req.body.jobTitle,
		phoneExtension: req.body.phoneExtension,
		emailAddress: req.body.emailAddress,
		spotlightUrl: req.body.spotlightUrl,
	})

	employee.save(function(err){
		if(err) res.sendStatus(404);
		res.sendStatus(200);
	});
	
});

router.get('/', function(req, res, next){
	Employee.find({}).populate("Location").exec(function(err, employees){
		if(err) res.sendStatus(404);
		res.status(200).send(employees);
	});
});

router.get('/:firstName', function(req, res, next){
	Employee.findOne({ firstName: req.params.firstName }).populate("Location").exec(function(err, employee){
		if(err) res.sendStatus(404);
		res.status(200).send(employee);
	});
});

router.delete('/:firstName', function(req, res, next){
	Employee.findOne({ firstName: req.params.firstName }).exec(function(err, employee){
		if(err) {
			res.status(404).send();
			return false;
		}
		if(employee != null){
			employee.remove(function(err){
				if(err) res.sendStatus(404);
				res.status(200).send({ sucess: "Employee deleted." });
			});
			
		} else {
			res.status(200).send({ error: "Could not find element." });
		}
		
	});
});

module.exports = router;