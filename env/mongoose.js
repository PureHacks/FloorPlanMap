var mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
	
} else {
	mongoose.connect('mongodb://admin:digital-seating-plan@ds063330.mongolab.com:63330/digital-seating-plan-dev');
}

module.exports = mongoose;