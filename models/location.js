var mongoose = require('../env/mongoose.js');

var locationSchema = mongoose.Schema({
	type: String,
	location: String
}); 

var LocationItem = mongoose.model('Location', locationSchema);

module.exports = LocationItem;