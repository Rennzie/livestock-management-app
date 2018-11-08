/* globals describe, it, api expect beforeEach  */

const Herd = require('../../../models/herd');
const herdTestData = require('../testData/herdsData');

//--- TEST DATA ---//
const herdData = herdTestData.single;

describe('POST /api/herds', () => {

  beforeEach(done => {
    Herd.deleteMany({})
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.post('/api/herds')
      .send(herdData)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.post('/api/herds')
      .send(herdData)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data ', done => {
    api.post('/api/herds')
      .send(herdData)
      .end(( err, res ) => {
        expect(res.body.name).to.eq(herdData.name);
        expect(res.body.class).to.eq(herdData.class);
        done();
      });
  });
});
