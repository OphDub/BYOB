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
});