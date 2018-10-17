/* globals describe, it, api expect beforeEach */

const Bovine = require('../../../models/bovine');
const bovineTestData = require('../testData/bovinesData');

const motherCow = bovineTestData.motherCow;
const newCalf = bovineTestData.newCalf;
const calfId = { calfId: '5b91752666708bc8b1622708' };
// const bovineIds = bovineTestData.bovineIds;

describe('POST /bovines/:id/breeding/production', () => {
  beforeEach( done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(motherCow))
      .then(() => Bovine.create(newCalf))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.post(`/api/bovines/${motherCow._id}/breeding/production`)
      .send(calfId)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should increase the mothers production array by one', done => {
    api.post(`/api/bovines/${motherCow._id}/breeding/production`)
      .send(calfId)
      .then(() => Bovine.findById(motherCow._id))
      .then( mother => {
        expect(mother.breeding.production.length).to.eq(motherCow.breeding.production.length + 1);
        done();
      });
  });

  //test that the calf and the mother exist in bovine.find() and in the mother production array
  it('should update the mothers production array to include the calfs id', done => {
    api.post(`/api/bovines/${motherCow._id}/breeding/production`)
      .send(calfId)
      .then(() => Bovine.findById(motherCow._id))
      .then( mother => {
        expect(mother.breeding.production).to.include(newCalf._id);
        done();
      });
  });

  it('should change the isPregnant to false', done => {
    api.post(`/api/bovines/${motherCow._id}/breeding/production`)
      .send(calfId)
      .then(() => Bovine.findById(motherCow._id))
      .then( mother => {
        expect(mother.breeding.isPregnant).to.be.false;
        done();
      });
  });
});
