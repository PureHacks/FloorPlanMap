## Introduction
Dude, you know Bob? Where does he sit?
Well, let me DSP that for you.

### Current API End Points
#### Employees

##### Model

{
	firstName: String,
	lastName: String,
	jobTitle: String,
	phoneExtension: String,
	emailAddress: String,
	spotlightUrl: String,
	slug: String # unique and generated 'firstName + "-" + lastName'
	location: { POI }
}

##### Routes

CREATE 	- POST		/api/employee/ with x-www-form-urlencode
INDEX	- GET		/api/employee/
READ	- GET		/api/employee/{firstName-lastName}
UPDATE	- PUT		/api/employee/{firstName-lastName} with x-www-form-urlencode
DELETE	- DELETE	/api/employee/{firstName-lastName}

ASSIGN LOCATION		- POST	/api/employee/{firstName-lastName}/assign/{locationId}
UNASSIGN LOCATION	- POST	/api/employee/{firstName-lastName}/unassign/

#### Points of Interest

##### Model

{
    type: String,
    coordinates: String
}

##### Routes

CREATE 	- POST		/api/poi/ with x-www-form-urlencode
READ	- GET		/api/poi/{id}
UPDATE	- PUT		/api/poi/{id} with x-www-form-urlencode
DELETE	- DELETE	/api/poi/{id}

### Development
1. Install [GIT](http://git-scm.com/downloads)
2. Get everything from GIT

    `git clone https://github.com/PureHacks/FloorPlanMap.git`

4. Install latest [NodeJS](http://nodejs.org/)
5. Update npm (with GIT Bash or Cygwin if you are using Windows)

    `npm update -g npm`

6. Install Grunt CLI for the project (under your project directory)

    `npm install -g grunt-cli`

7. Install Grunt for the project

    `npm install`

8. Run grunt, which will initialize **less, browserify, express**

    `grunt workon`

9. Local page URL: `http://localhost:3000/`

### Checkout Wiki for Details
https://github.com/PureHacks/FloorPlanMap/wiki/Getting-Started
=======
To run type `grunt workon`
