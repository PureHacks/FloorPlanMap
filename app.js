'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//var $ = require('jquery');
var port = 3000;

/*
 * Use Handlebars for templating
 */
var exphbs = require('express-handlebars');
var hbs;

/*
 * Config for Production and Development
 */
if (process.env.NODE_ENV === 'production') {
    // Set the default layout and locate layouts and partials
    app.engine('handlebars', exphbs({
        defaultLayout: 'main',
        layoutsDir: 'dist/views/layouts/',
        partialsDir: 'dist/views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/dist/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/dist/assets'));

} else {
    app.engine('handlebars', exphbs({
        // Default Layout and locate layouts and partials
        defaultLayout: 'main',
        layoutsDir: 'views/layouts/',
        partialsDir: 'views/partials/'
    }));

    // Locate the views
    app.set('views', __dirname + '/views');
    
    // Locate the assets
    app.use(express.static(__dirname + '/assets'));
}

// Set Handlebars
app.set('view engine', 'handlebars');
app.use(bodyParser.urlencoded({ extended: true }));

/*
 * Route logging
 */
app.use(function(req, res, next) {
  console.log('%s %s', req.method, req.url);
  next();
});

/*
 * Apis
 */
app.use('/api', require('./routes/index.js'));

/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
	response.render('index');
});

app.get('/seats', function(request, response, next) {
	next();
});

app.get('/seats/browse/:floor', function(request, response, next) {
	
	var floor = request.params.floor || '9';	// default to 9th floor
	
	response.render('seats-browse', {
		pageType: 'browse',
		floor: floor,
		layout: 'map'
	});
});

app.get('/seats/search/:searchTerm', function(request, response, next) {
	
	var searchTerm = request.params.searchTerm || 'reception';
	
	response.render('seats-search', {
		pageType: 'search',
		searchTerm: searchTerm,
		layout: 'map'
	});
});


app.get('/admin/employee/:adminAction?', function(request, response, next) {
	
	var adminAction = request.params.adminAction || 'add';
	
	if (adminAction === 'edit')
	{
		next();
		return;
	}
	else
	{		
		response.render('admin-employee', {
			pageType: 'admin-employee-add',
			adminAction: 'add',
			layout: 'admin'
		});
	}
});

app.get('/admin/employee/edit/:employeeName?', function(request, response, next) {
	
	var employeeName = request.params.employeeName || '';
	
	response.render('admin-employee', {
		pageType: 'admin-employee-edit',
		adminAction: 'edit',
		employeeName: employeeName,
		layout: 'admin'
	});
});

app.get('/admin/desks/:deskId?', function(request, response, next) {
	
	var deskId = request.params.deskId || '';
	
	response.render('admin-desks', {
		pageType: 'admin-desks',
		deskId: deskId,
		layout: 'admin'
	});
});

/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);