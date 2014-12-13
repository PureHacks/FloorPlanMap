var express = require('express'),
	router = express.Router(),
	Locations = require('models/location');


router.post('/', function(req, res, next){
	var location = new Locations({
		type: req.body.type,
		location: req.body.coordinates
	});

	location.save(function(err){
		if(err) {
			res.status(404).send({error: "Something went wrong!"});
			return false;
		}
		res.sendStatus(200);
	});
	
});

router.get('/', function(req, res, next){
	Locations.find({}).exec(function(err, locations){
		if(err) {
			res.sendStatus(404);
			return false;
		}
		res.status(200).send(locations);
	});
});

router.get('/:id', function(req, res, next){
	Locations.findById(req.params.id, function(err, locations){
		if(err) {
			res.sendStatus(404);
			return false;
		}
		res.status(200).send(locations);
	});
});

router.put('/:id', function(req, res, next){
	Locations.findOne(req.params.id, function(err, locations){
		if(err || locations == null) {
			res.status(404).send({error: "Not found"});
			return false;
		} 

		for(var key in req.body){
			locations[key] = req.body[key];
		}

		locations.save(function(err){
			res.status(200).send(locations);
		});

	});
});

router.delete('/:id', function(req, res, next){
	Locations.findOne(req.params.id, function(err, locations){
		if(err) {
			res.status(404).send();
			return false;
		}
		if(locations != null){
			locations.remove(function(err){
				if(err) {
					res.sendStatus(404);
					return false;
				}
				res.status(200).send({ sucess: "Locations deleted." });
			});
			
		} else {
			res.status(200).send({ error: "Could not find element." });
		}
		
	});
});

module.exports = router;