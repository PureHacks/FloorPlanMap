var mongoose = require('../env/mongoose.js');

var employeeSchema = mongoose.Schema({
	firstName: String,
	lastName: String,
	jobTitle: String,
	phoneExtension: String,
	emailAddress: String,
	spotlightUrl: String,
	location: { type: mongoose.Schema.ObjectId, ref: 'Location'}
});

var Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
