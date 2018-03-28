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

  describe('VENUES endpoints', () => {
    describe('GET /api/v1/venues', () => {
      it('return all of the venues', () => {
        return chai.request(server)
        .get('/api/v1/venues')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body[0].should.have.property('name');
          response.body[0].should.have.property('city');
          response.body.length.should.equal(1);
        })
        .catch(err => {
          throw err;
        });
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
      
      });
    });

    describe('PATCH /api/v1/venues/:id/', () => {
      it('should change a venue when given the correct id', () => {

      });

      it('should return a 404 if no venue matches', () => {

      });
    });

    describe('DELETE /api/v1/venues/:id/', () => {
      it('should delete a venue when given the correct id', () => {

      });

      it('should return a 404 if no venue matches', () => {

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
        const newConcert = {
          artist: 'Seven Lions',
          date: '4/15/2018',
          time: '8:00pm',
          venue_id: venueId
        };

        return chai.request(server)
        .post(`/api/v1/concerts`)
        .send(newConcert)
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
        const incompleteConcert = {
          artist: 'Seven Lions',
          date: '4/17/2018',
          venue_id: venueId
        };

        return chai.request(server)
        .post(`/api/v1/concerts`)
        .send(incompleteConcert)
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

      });

      it('should return a 404 if no concert matches', () => {

      });
    });
  });
});