/* globals describe, it, api expect beforeEach */

const Herd = require('../../../models/herd');
const herdTestData = require('../testData/herdsData');

//--- TEST DATA ---//
const herdData = herdTestData.single;
const herdIds = herdTestData.herdIds;

describe('SHOW herds/:id', () => {
  beforeEach(done => {
    Herd.deleteMany({})
      .then(() => Herd.create(herdData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        expect(res.body._id).to.eq(herdData._id);
        expect(res.body.name).to.eq(herdData.name);
        expect(res.body.animals).to.eql(herdData.animals);
        expect(res.body.category).to.eq(herdData.category);
        done();
      });
  });

});
