var mongoose = require('../env/mongoose.js'),
	textSearch = require('mongoose-text-search');

var poiSchema = mongoose.Schema({
	type: String,
	coordinates: String
}); 

poiSchema.plugin(textSearch);
poiSchema.index({ 
	type: 'text'
});

var poiItem = mongoose.model('poi', poiSchema);

module.exports = poiItem;