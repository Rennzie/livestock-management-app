/* globals describe, it, api expect beforeEach */

const Bovine = require('../../../src/models/bovine');
const bovineTestData = require('../testData/bovinesData');

// const fs = require('fs');

// --- TEST DATA ---//
const bovineData = bovineTestData.currentMulti;
const newWeights =
  '/Users/Sean/development/side-projects/livestock-management-app/test/server/testData/bovineBatchWeights.csv';
// const fileName = 'bovineBatchWeights.csv';

describe('POST /bovines/weights', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  xit('should return a 201 response', done => {
    api
      .post('/bovines/weights')
      // .field('Content-Type', 'multipart/form-data')
      .attach('file', newWeights)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  xit('should return an array of bovines', done => {});

  xit('should increase all the weights array by one', done => {});

  xit('should increase all the weights by the correct data', done => {});
});
