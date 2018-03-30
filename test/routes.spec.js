const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('API Routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  describe('JWT Authentication endpoint', () => {
    describe('POST /api/v1/authenticate', () => {
      it('should return 422 when not given the correct parameters', () => {
        const incompleteUserAppInfo = {
          email: 'suh@dude.com'
        };
        const missingInfo = 'app_name';

        return chai.request(server)
        .post('/api/v1/authenticate')
        .send(incompleteUserAppInfo)
        .then( response => {
          response.should.have.status(422);
          response.body.error.should.equal(
            `Expected format: { email: <string>, app_name: <string> }. You are missing a "${missingInfo}".`
          )
        })
        .catch( error => {
          throw error;
        });
      });

      it('should return a token when given the correct parameters', () => {
        const userAppInfo = {
          email: 'suh@dude.com',
          app_name: 'suhdude'
        };

        return chai.request(server)
        .post('/api/v1/authenticate')
        .send(userAppInfo)
        .then( response => {
          response.should.have.status(201);
          response.should.be.json;
          response.should.be.a('object');
        })
        .catch( error => {
          throw error;
        });
      });
    });
  });

  describe('VENUES endpoints', () => {
    describe('GET /api/v1/venues', () => {
      it('return all of the venues', () => {
        return chai.request(server)
        .get('/api/v1/venues')
        .then( response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('city');
          response.body.length.should.equal(2);
        })
        .catch( err => {
          throw err;
        });
      });

      it('return specific venue for id passed in', () => {
        return chai.request(server)
        .get('/api/v1/venues/1')
        .then( response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('city');
          response.body.length.should.equal(1);
        })
        .catch( err => {
          throw err;
        })
      });
    });

    describe('POST /api/v1/venues', () => {
      it('should add new venue when given the correct data', () => {
        return chai.request(server)
        .post('/api/v1/venues')
        .send({
          name: 'Sweet Venue',
          city: 'Denvaaa'
        })
        .then(response => {
          response.should.have.status(201);
          response.body.should.be.a('object');
          response.body.should.have.property('name');
          response.body.name.should.equal('Sweet Venue');
          response.body.should.have.property('city');
          response.body.city.should.equal('Denvaaa');
        })
        .catch(err => {
          throw err;
        });
      });

      it('should not create a venue with missing data', () => {
        return chai.request(server)
        .post('/api/v1/venues')
        .send({
          city: 'Denver'
        })
        .then(response => {
          response.should.have.status(422);
          response.body.error.should.equal('Expected format: { name: <String> }. You\'re missing a "name" property.');
        })
        .catch( err => {
          throw err;
        });
      });
    });

    describe('PATCH /api/v1/venues/:id/', () => {
      it('should change a venue when given the correct id', () => {
        return chai.request(server)
          .patch('/api/v1/venues/1')
          .send({
            city: 'Colorado Springs'
          })
          .then( response => {
            response.should.have.status(200)
          })
          .catch( err => {
            throw err;
          })
      });

      it('should return a 404 if no venue matches', () => {

      });
    });

    describe('DELETE /api/v1/venues/:id/', () => {
      it('should delete a venue when given the correct id', () => {
        return chai.request(server)
        .delete('/api/v1/venues/1')
        .then(response => {
          response.should.have.status(204);
        })
        .catch(error => {
          throw error;
        });
      });

      it.skip('should return a 404 if no venue matches', () => {
        return chai.request(server)
        .delete('/api/v1/venues/550')
        .then(response => {
          response.should.have.status(404);
        })
        .catch(error => {
          throw error;
        });
      });
    });
  });

  describe('CONCERTS endpoints', () => {
    describe('GET /api/v1/concerts', () => {
      it('should return all of the concerts', () => {
        return chai.request(server)
        .get('/api/v1/concerts')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('artist');
          response.body[0].artist.should.equal('Kelly Clarkson');
          response.body[0].should.have.property('date');
          response.body[0].date.should.equal('3/27/2018');
          response.body[0].should.have.property('time');
          response.body[0].time.should.equal('8:00pm');
          response.body[0].should.have.property('venue_id');
          response.body[0].venue_id.should.equal(1);
          response.body[1].should.have.property('artist');
          response.body[1].artist.should.equal('Lil Jon');
          response.body[1].should.have.property('date');
          response.body[1].date.should.equal('3/29/2018');
          response.body[1].should.have.property('time');
          response.body[1].time.should.equal('8:00pm');
          response.body[1].should.have.property('venue_id');
          response.body[1].venue_id.should.equal(1);
        })
        .catch(error => {
          throw error
        });
      });
    });

    describe('POST /api/v1/concerts', () => {
      it('should create a concert when given the correct data', () => {
        const venueId = 1;
        const validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmJpZUB0dXJpbmcuaW8iLCJhcHBfbmFtZSI6ImFtYXppbmcgYXBwIiwiaWF0IjoxNTIyMzc5Mzc2LCJleHAiOjE1MjI1NTIxNzZ9.gY0PRkV6-mICZho55RGIMzhcWZBGDZJdI9szOgoC_AE`
        const newConcert = {
          artist: 'Seven Lions',
          date: '4/15/2018',
          time: '8:00pm',
          venue_id: venueId,
        };

        return chai.request(server)
        .post(`/api/v1/concerts`)
        .set('authorization', validToken)
        .send({
          concert: newConcert
        })
        .then(response => {
          response.should.have.status(201);
          response.should.be.json;
          response.should.be.an('object');
          response.body.should.have.property('id');
          response.body.id.should.equal(3);
          response.body.should.have.property('artist');
          response.body.artist.should.equal('Seven Lions');
          response.body.should.have.property('date');
          response.body.date.should.equal('4/15/2018');
          response.body.should.have.property('time');
          response.body.time.should.equal('8:00pm');
          response.body.should.have.property('venue_id');
          response.body.venue_id.should.equal(1);
        })
        .catch(error => {
          throw error;
        });
      });

      it('should not create a concert with missing data', () => {
        const venueId = 1;
        const validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvYmJpZUB0dXJpbmcuaW8iLCJhcHBfbmFtZSI6ImFtYXppbmcgYXBwIiwiaWF0IjoxNTIyMzc5Mzc2LCJleHAiOjE1MjI1NTIxNzZ9.gY0PRkV6-mICZho55RGIMzhcWZBGDZJdI9szOgoC_AE`;
        const incompleteConcert = {
          artist: 'Seven Lions',
          date: '4/17/2018',
          venue_id: venueId
        };

        return chai.request(server)
        .post(`/api/v1/concerts`)
        .set('authorization', validToken)
        .send({
          concert:incompleteConcert
        })
        .then(response => {
          const missingParameter = 'time';

          response.should.have.status(422);
          response.body.error.should.equal(
            `Expected format: { artist: <string>, date: <string>, time: <string>, venue_id: <integer> }. You are missing a "${missingParameter}" property.`
          )
        })
        .catch(error => {
          throw error;
        })
      });
    });

    describe('PATCH /api/v1/concerts/:id/', () => {
      it('should change a concert when given the correct id', () => {

      });

      it('should return a 404 if no concert matches', () => {

      });
    });

    describe('DELETE /api/v1/concerts/:id/', () => {
      it('should delete a concert when given the correct id', () => {
        const concertId = 1;

        return chai.request(server)
        .delete(`/api/v1/concerts/${concertId}`)
        .then(response => {
          response.status.should.equal(204);
        })
        .catch(error => {
          throw error;
        });
      });

      it('should return a 404 if no concert matches', () => {
        const invalidConcertId = 50;

        return chai.request(server)
        .delete(`/api/v1/concerts/${invalidConcertId}`)
        .then(response => {
          response.status.should.equal(404);
          response.body.error.should.equal(`Could not find concert with id - ${invalidConcertId}.`)
        })
        .catch(error => {
          throw error;
        });
      });
    });
  });
});