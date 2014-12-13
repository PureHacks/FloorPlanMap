var express = require('express'),
	router = express.Router(),
	Poi = require('../models/poi.js');


router.post('/', function(req, res, next){
	var item = new Poi({
		type: req.body.type,
		coordinates: req.body.coordinates
	});

	item.save(function(err){
		if(err) {
			res.status(404).send({error: "Something went wrong!"});
			return false;
		}
		res.sendStatus(200);
	});
	
});

router.get('/', function(req, res, next){
	Poi.find({}).exec(function(err, item){
		if(err) {
			res.sendStatus(404);
			return false;
		}
		res.status(200).send(item);
	});
});

router.get('/:id', function(req, res, next){
	Poi.findById(req.params.id, function(err, items){
		if(err) {
			res.sendStatus(404);
			return false;
		}
		res.status(200).send(items);
	});
});

router.put('/:id', function(req, res, next){
	Poi.findOne(req.params.id, function(err, items){
		if(err || items == null) {
			res.status(404).send({error: "Not found"});
			return false;
		} 

		for(var key in req.body){
			items[key] = req.body[key];
		}

		items.save(function(err){
			res.status(200).send(items);
		});

	});
});

router.delete('/:id', function(req, res, next){
	Poi.findOne(req.params.id, function(err, item){
		if(err) {
			res.status(404).send();
			return false;
		}
		if(item != null){
			Item.remove(function(err){
				if(err) {
					res.sendStatus(404);
					return false;
				}
				res.status(200).send({ sucess: "Item deleted." });
			});
			
		} else {
			res.status(200).send({ error: "Could not find element." });
		}
		
	});
});

module.exports = router;