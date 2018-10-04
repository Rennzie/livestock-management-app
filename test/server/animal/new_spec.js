/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const animalTestData = require('../testData/animalsData');


const animalData = animalTestData.archivedSingle;

describe('POST /animals', () => {

  beforeEach(done => {
    Animal.deleteMany({});
    done();
  });

  it('should return a 201 response', done => {
    api.post('/api/animals')
      .send(animalData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return a object', done => {
    api.post('/api/animals')
      .send(animalData)
      .end((err, res) => {
        // console.log('the returned data is:=======> ', res.body);
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return a object', done => {
    api.post('/api/animals')
      .send(animalData)
      .end((err, res) => {
        expect(res.body.type).to.eq(animalData.type);
        expect(res.body.saleRevenue).to.eq(animalData.saleRevenue);
        done();
      });
  });
});
