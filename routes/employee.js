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
		if(err) {
			res.status(404).send({error: "Something went wrong!"});
			return false;
		}
		res.sendStatus(200);
	});
	
});

router.get('/', function(req, res, next){
	Employee.find({}).populate("Location").exec(function(err, employees){
		if(err) {
			res.sendStatus(404);
			return false;
		}
		res.status(200).send(employees);
	});
});

router.get('/:slug', function(req, res, next){
	Employee.findOne({ slug: req.params.slug }).populate("Location").exec(function(err, employee){
		if(err) {
			res.sendStatus(404);
			return false;
		}
		res.status(200).send(employee);
	});
});

router.put('/:slug', function(req, res, next){
	Employee.findOne({ slug: req.params.slug }, function(err, employee){
		if(err || employee == null) {
			res.status(404).send({error: "Not found"});
			return false;
		} 

		for(var key in req.body){
			employee[key] = req.body[key];
		}

		employee.save(function(err){
			res.status(200).send(employee);
		});

	});
});

router.delete('/:slug', function(req, res, next){
	Employee.findOne({ slug: req.params.slug }, function(err, employee){
		if(err) {
			res.status(404).send();
			return false;
		}
		if(employee != null){
			employee.remove(function(err){
				if(err) {
					res.sendStatus(404);
					return false;
				}
				res.status(200).send({ sucess: "Employee deleted." });
			});
			
		} else {
			res.status(200).send({ error: "Could not find element." });
		}
		
	});
});

module.exports = router;