## Introduction

### Current API End Points
#### Employees

CREATE 	- POST		/api/employee/ with x-www-form-urlencode
INDEX	- GET		/api/employee/
READ	- GET		/api/employee/{firstName-lastName}
UPDATE	- PUT		/api/employee/{firstName-lastName} with x-www-form-urlencode
DELETE	- DELETE	/api/employee/{firstName-lastName}

ASSIGN LOCATION		- POST	/api/employee/{firstName-lastName}/assign/{locationId}
UNASSIGN LOCATION	- POST	/api/employee/{firstName-lastName}/unassign/

#### Locations

CREATE 	- POST		/api/location/ with x-www-form-urlencode
READ	- GET		/api/location/{id}
UPDATE	- PUT		/api/location/{id} with x-www-form-urlencode
DELETE	- DELETE	/api/location/{id}

### Development
To run type `grunt workon`
