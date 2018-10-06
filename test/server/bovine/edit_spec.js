/* globals describe, it, api expect beforeEach */

const Bovine = require('../../../models/bovine');
const bovineTestData = require('../testData/bovinesData');

const testIds = bovineTestData.bovineIds;
const bovineData = bovineTestData.currentMulti;
const updateData = bovineTestData.currentSingleEdit;

describe('PUT /bovines/:id', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.put(`/api/bovines/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/bovines/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/bovines/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.body.category).to.eq(updateData.category);
        expect(res.body.breed).to.eq(updateData.breed);
        done();
      });

  });
});
