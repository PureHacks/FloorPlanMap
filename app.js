'use strict';

/*
 * Express Dependencies
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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
app.use('/api', require('routes/index'));

/*
 * Routes
 */
// Index Page
app.get('/', function(request, response, next) {
    response.render('index');
});


/*
 * Start it up
 */
app.listen(process.env.PORT || port);
console.log('Express started on port ' + port);