# BYOB [![Build Status](https://travis-ci.org/OphDub/BYOB.svg?branch=master)](https://travis-ci.org/OphDub/BYOB)
Project utilizing Express, knex, and PostgreSQL to create API concerts at venues in Denver, CO (based on data from Ticketmaster's API)

# Build Your Own Backend (BYOB)

An API of concerts at various venues in Denver, CO based on data from the Ticketmaster API.

To run this repo, clone it down, run ```npm install```, and ```npm start```

## Endpoint: Concerts
#### ```GET api/v1/concerts```

Response:
```
```

#### ```GET /api/v1/concerts/:id```

Response: 
```
```

#### ```POST api/v1/concerts```

- Parameters:
  - ```artist: <String>``` required
  - ```date: <String>``` required
  - ```time: <String>``` required
  - ```venue_id: <Number>``` required

Response: 
```
```

#### ```PATCH api/v1/concerts/:id```

- Parameters:
  - ```artist: <String>``` required
  - ```date: <String>``` required
  - ```time: <String>``` required
  - ```venue_id: <Number>``` required

Response
```
```

#### ```DELETE api/v1/concerts/:id```

- Parameters:
  - ```id: <Number>``` required

Response:
```
```

## Endpoint: Venues
#### ```GET api/v1/venues```

Response:
```

```

#### ```GET /api/v1/venues/:id```

Response:
```

```

#### ```POST api/v1/venues```

- Parameters:
  - ```city: <String>``` required
  - ```name: <String>``` required

Response: 
```

```

#### ```PATCH api/v1/venues/:id```

- Parameters:
  - ```city: <String>``` required
  - ```name: <String>``` required

Response
```

```


#### ```DELETE api/v1/venues/:id```

- Parameters:

  - ```id: <Number>``` required

Response: 
```

```
