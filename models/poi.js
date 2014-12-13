var mongoose = require('../env/mongoose.js');

var poiSchema = mongoose.Schema({
	type: String,
	coordinates: String
}); 

var poiItem = mongoose.model('poi', poiSchema);

module.exports = poiItem;