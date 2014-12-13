## Introduction

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
To run type `grunt workon`
