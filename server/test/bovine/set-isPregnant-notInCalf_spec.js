/* globals describe, it, api expect  beforeEach */

import Bovine from '../../src/models/bovine';
import bovineTestData from '../testData/bovinesData';

// --- TEST DATA ---//
const bovineData = bovineTestData.currentSingle;
const pregTest = {
  date: 1539213325,
  isPregnant: true
};

describe('POST /bovines/:id/breeding/pregtest', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should update the correct data', done => {
    api
      .post(`/api/bovines/${bovineData._id}/breeding/pregtest`)
      .send(pregTest)
      .end(() => {
        Bovine.findById(bovineData._id).then(bovine => {
          expect(bovine.breeding.isPregnant).to.eq(pregTest.isPregnant);
          expect(bovine.breeding.pregTestingHistory[0].isPregnant).to.eq(pregTest.isPregnant);
          expect(bovine.breeding.pregTestingHistory[0].date).to.eq(pregTest.date);
          done();
        });
      });
  });

  it('should return a 201 response', done => {
    api
      .post(`/api/bovines/${bovineData._id}/breeding/pregtest`)
      .send(pregTest)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });
});
