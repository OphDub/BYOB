const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

describe('API Routes', () => {

  describe('GET /api/v1/police_district', () => {
    it('return all of the police districts', () => {
      return chai.request(server)
      .get('/api/v1/police_district')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        //response.body[0].should.have.property(propertyname);
        //response.body[0].propertyname.should.equal('1');
      })
      .catch(err => {
        throw err;
      });
    });
  });
  
  describe('GET /api/v1/marijuana_incident/', () => {
    it('return all of the incidents', () => {
      return chai.request(server)
      .get('/api/v1/marijuana_incident/')
      .then(response => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        //test for all property keys and values of response.body[0]
      })
      .catch(err => {
        throw err;
      });
    });
  });

  describe('POST /api/v1/police_district', () => {
    it('add new police district', () => {
      return chai.request(server)
      .post('/api/v1/police_district')
      .send({
        //data
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        //response.body.should.have.property(propertyname);
        //response.body.propertyname.should.equal('');
      })
      .catch(err => {
        throw err;
      });
    });

    it('should not create a record with missing data', () => {
      return chai.request(server)
      .post('/api/v1/police_district')
      .send({
        //data
      })
      .then(response => {
        response.should.have.status(422);
        //response.body.error.should.equal(whatever we set response error to)
      })
      .catch(err => {
        throw err
      });
    });
  });

  describe('POST /api/v1/marijuana_incident/', () => {
    it('add new police district', () => {
      return chai.request(server)
      .post('/api/v1/marijuana_incident/')
      .send({
        //data
      })
      .then(response => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        //response.body.should.have.property(propertyname);
        //response.body.propertyname.should.equal('');
      })
      .catch(err => {
        throw err;
      });
    });

    it('should not create a record with missing data', () => {
      return chai.request(server)
      .post('/api/v1/marijuana_incident/')
      .send({
        //data
      })
      .then(response => {
        response.should.have.status(422);
        //response.body.error.should.equal(whatever we set response error to)
      })
      .catch(err => {
        throw err
      });
    });
  });

});