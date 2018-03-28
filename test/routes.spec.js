const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

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
          response.body.length.should.equal('1');
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
      it('return all of the concerts', () => {

      });
    });

    describe('POST /api/v1/concerts', () => {
      it('should create a concert when given the correct data', () => {

      });

      it('should not create a concert with missing data', () => {

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