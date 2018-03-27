const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);
app.locals.title = 'BYOB';

app.get('/', (request, response) => {
});

app.get('/api/v1/police_district', (request, response) => {
  //SELECT * all rows in police district table
});

app.post('/api/v1/police_district', (request, response) => {
  //INSERT with PRIMARY_KEY id matching id
  // Add conditional to check for id
});

app.get('/api/v1/police_district/:id/', (request, response) => {
  //query WHERE id matches police district PRIMARY_KEY id
});

app.patch('/api/v1/police_district/:id/', (request, response) => {
  //query WHERE id matches police district PRIMARY_KEY id followed by UPDATE to record
});

app.delete('/api/v1/police_district/:id/', (request, response) => {
  //query WHERE id matches police district PRIMARY_KEY id followed by DELETE on record
})

app.get('/api/v1/marijuana_incident/', (request, response) => {
  //SELECT * all rows in marijuana incident table
});

app.post('/api/v1/marijuana_incident/', (request, response) => {
  //INSERT with PRIMARY_KEY incident_id matching id
  //Add conditional to check for incident_id, report_date, incident_address, district_id(foreign key), offense_type_id, offense code, neighborhood_id, mj_relation_type
});

app.get('/api/v1/marijuana_incident/:id/', (request, response) => {
  //query WHERE id matches marijuana incident PRIMARY_KEY incident_id
});

app.patch('/api/v1/marijuana_incident/:id/', (request, response) => {
  //query WHERE id matches marijuana incident PRIMARY_KEY incident_id followed by UPDATE to record
});

app.delete('/api/v1/marijuana_incident/:id/', (request, response) => {
  //query WHERE id matches marijuana incident PRIMARY_KEY incident_id followed by DELETE on record
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});