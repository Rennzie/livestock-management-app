/* globals describe, it, api expect beforeEach */

const Bovine = require('../../src/models/bovine');
const bovineTestData = require('../testData/bovinesData');

// --- TEST DATA ---//
const bovineData = bovineTestData.currentMulti;
const statusChangeIds = bovineTestData.updatedCategories.ids;

describe('PATCH /bovines/fattening', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .patch('/api/bovines/fattening')
      .send(statusChangeIds)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should change the fattening.status to true', done => {
    api
      .patch('/api/bovines/fattening')
      .send(statusChangeIds)
      .end(() => {
        Bovine.find({ _id: { $in: statusChangeIds } }).then(bovines => {
          bovines.forEach(bovine => expect(bovine.fattening.status).to.be.true);
          done();
        });
      });
  });
});

describe('PATCH /bovines/breeding', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .patch('/api/bovines/breeding')
      .send(statusChangeIds)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should change the breeding.status to true', done => {
    api
      .patch('/api/bovines/breeding')
      .send(statusChangeIds)
      .end(() => {
        Bovine.find({ _id: { $in: statusChangeIds } }).then(bovines => {
          bovines.forEach(bovine => expect(bovine.breeding.status).to.be.true);
          done();
        });
      });
  });
});
