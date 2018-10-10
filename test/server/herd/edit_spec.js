/* globals describe, it, api expect beforeEach */

const Herd = require('../../../models/herd');
const herdTestData = require('../testData/herdsData');

//--- TEST DATA ---//
const herdData = herdTestData.single;
const herdIds = herdTestData.herdIds;
const updatedHerdData = herdTestData.updateSingle;

describe('PUT /herds/:id', () => {
  beforeEach(done => {
    Herd.deleteMany({})
      .then(() => Herd.create(herdData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.put(`/api/herds/${herdIds[0]}`)
      .send(updatedHerdData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/herds/${herdIds[0]}`)
      .send(updatedHerdData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correctly updated data', done => {
    api.put(`/api/herds/${herdIds[0]}`)
      .send(updatedHerdData)
      .end((err, res) => {
        expect(res.body.name).to.eq(updatedHerdData.name);
        done();
      });
  });
});
