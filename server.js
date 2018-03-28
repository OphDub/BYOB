const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.locals.title = 'BYOB';

app.get('/', (request, response) => {
});

app.get('/api/v1/venues', (request, response) => {
  database('venues').select()
  .then(venues => {
    response.status(200).json(venues);
  })
  .catch((error) => {
    response.status(500).json({ error });
  });
});

app.post('/api/v1/venues', (request, response) => {
  
});

app.get('/api/v1/venues/:id/', (request, response) => {
  //query WHERE id matches venues PRIMARY_KEY id
});

app.patch('/api/v1/venues/:id/', (request, response) => {
  //query WHERE id matches venues PRIMARY_KEY id followed by UPDATE to record
});

app.delete('/api/v1/venues/:id/', (request, response) => {
  //query WHERE id matches venues PRIMARY_KEY id followed by DELETE on record
})

app.get('/api/v1/concerts/', (request, response) => {
  //SELECT * all rows in concerts table
});

app.post('/api/v1/concerts/', (request, response) => {
  //INSERT with PRIMARY_KEY incident_id matching id
  //Add conditional to check for incident_id, report_date, incident_address, district_id(foreign key), offense_type_id, offense code, neighborhood_id, mj_relation_type
});

app.get('/api/v1/concerts/:id/', (request, response) => {
  //query WHERE id matches concerts PRIMARY_KEY incident_id
});

app.patch('/api/v1/concerts/:id/', (request, response) => {
  //query WHERE id matches concerts PRIMARY_KEY incident_id followed by UPDATE to record
});

app.delete('/api/v1/concerts/:id/', (request, response) => {
  //query WHERE id matches concerts PRIMARY_KEY incident_id followed by DELETE on record
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});