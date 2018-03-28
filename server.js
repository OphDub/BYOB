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
  const venuesInfo = request.body;

  for (let requiredParameter of ['name', 'city']) {
    if (!venuesInfo[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { name: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  database('venues').insert(venuesInfo, 'id')
  .then(venues => {
    const { name, city } = venuesInfo;
    response.status(201).json({ id: venues[0], name, city })
  })
  .catch(error => {
    response.status(500).json({ error });
  });
});

app.get('/api/v1/venues/:id/', (request, response) => {
  const { id } = request.params;
  const venue = database('venues').find(message => message.id === id);
  if (venue) { 
    return response.status(200).json(venue);
  } else {
    return response.sendStatus(404);
  }
});

app.patch('/api/v1/venues/:id/', (request, response) => {
  //query WHERE id matches venues PRIMARY_KEY id followed by UPDATE to record
});

app.delete('/api/v1/venues/:id/', (request, response) => {
  const { id } = request.params;
  const venue = database('venues').find(message => message.id === id);
  
  venue.delete()
    .then(data => {
      return response.status(204).json({ data });
    })
    .catch(error => {
      return response.status(500).json({ error });
    })
})

app.get('/api/v1/concerts/', (request, response) => {
  database('concerts').select()
    .then((concerts) => {
      response.status(200).json(concerts);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/concerts', (request, response) => {
  const concertInfo = request.body;
  const concertParams = ['artist', 'date', 'time', 'venue_id'];

  for(let requiredParameter of concertParams) {
    if(!concertInfo[requiredParameter]) {
      return response
        .status(422)
        .send({
          error: `Expected format: { artist: <string>, date: <string>, time: <string>, venue_id: <integer> }. You are missing a "${requiredParameter}" property.`
        });
    }
  }

  database('concerts').insert(concertInfo, 'id')
    .then(concert => {
      const { artist, date, time, venue_id } = concertInfo;

      response.status(201).json({
        id: concert[0],
        artist,
        date,
        time,
        venue_id
      })
    })
    .catch(error => {
      response.status(500).json({ error });
    });
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

module.exports = app;