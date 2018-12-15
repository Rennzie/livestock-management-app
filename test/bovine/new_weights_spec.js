/* globals describe, it, api expect beforeEach */

import Bovine from '../../src/models/bovine';
import bovineTestData from '../testData/bovinesData';

// --- TEST DATA ---//
const testIds = bovineTestData.bovineIds;
const bovineData = bovineTestData.currentSingle;
const { newWeight } = bovineTestData;

describe('POST /bovine/:id/weights', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .post(`/api/bovines/${testIds[0]}/weights`)
      .send(newWeight)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object which contains a weights array', done => {
    api
      .post(`/api/bovines/${testIds[0]}/weights`)
      .send(newWeight)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        expect(res.body.weights).to.be.an('array');
        done();
      });
  });

  it('should increase the length of the weights array by one if it exists', done => {
    api
      .post(`/api/bovines/${testIds[0]}/weights`)
      .send(newWeight)
      .end((err, res) => {
        expect(res.body.weights.length).to.eq(bovineData.weights.length + 1);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post(`/api/bovines/${testIds[0]}/weights`)
      .send(newWeight)
      .end((err, res) => {
        const updatedWeight = res.body.weights.filter(weight => weight._id === testIds[2])[0];
        expect(updatedWeight.weight).to.eq(newWeight.weight);
        expect(updatedWeight.units).to.eq(newWeight.units);
        done();
      });
  });
});
