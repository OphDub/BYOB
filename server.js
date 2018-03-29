const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const key = require('./secret-key');

const checkAuth = (request, response, next) => {
  const { token } = request.body;

  if (token) {
    const decoded = jwt.verify(token, 'secret_key', {algorithm: 'HSA256'});

    if(decoded.email.includes('@turing.io')) {
      next();
    } else {
      response.status(403).send({
        error: `Not authorized`
      });
    }
  } else if (!token) {
    response.status(403).send({ error: `You must be authorized to hit this endpoint.`});
  }
};

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);
app.set('secret_key', key);
app.use(bodyParser.json());
app.use(express.static('public'));
app.locals.title = 'BYOB';

app.get('/', (request, response) => {
});

app.post('/api/v1/authenticate', (request, response) => {
  const { email, app_name } = request.body;
  const payload = { email, app_name };
  const authParams = ['email', 'app_name'];

  for(let requiredParameter of authParams) {
    if(!payload[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { email: <string>, app_name: <string> }. You are missing a "${requiredParameter}".`
      })
    }
  }

  jwt.sign(payload, 'secret_key', { expiresIn: '48 h', algorithm: 'HS256' },
    (err, token) => {
      response.status(201).json(token)
      .catch( error => {
        response.status(500).json({ error })
      });
    }
  );
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
  const venues = database('venues');

  venues.where('id', id)
    .then( venue => {
      response.status(200).json(venue)
    })
    .catch( venue => {
      response.status(404);
    })
});

app.patch('/api/v1/venues/:id/', (request, response) => {
  const { id } = request.params;
  const venues = database('venues');
  const { city, name } = request.body;

  if(city) {
    venues.where('id', id).update({ city })
      .then(() => {
        response.status(200).send('City sucessfully updated.');
      })
  }

  if(name) {
    venues.where('id', id).update({ name })
      .then(() => {
        response.status(200).send('Venue name successfully updated');
      })
  }
});

app.delete('/api/v1/venues/:id/', (request, response) => {
  const { id } = request.params;
  const venue = database('venues');
  const concerts = database('concerts');

  concerts.where('venue_id', id).delete()
    .then(() => {
      venue.where('id', id).delete()
      .then(data => {
        return response.status(204).json({ data });
      })
      .catch(error => {
        return response.status(500).json({ error });
      })
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
  const concertId  = request.params.id;
  const concert = database('concerts').where('id', concertId);

  concert.delete()
    .then(concert => {
      if (concert) {
        response.status(204).json({ concert });
      } else {
        response.status(404).json({
          error: `Could not find concert with id - ${concertId}.`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});

module.exports = app;