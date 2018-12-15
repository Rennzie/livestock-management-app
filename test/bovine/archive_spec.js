/* globals describe, it, api expect beforeEach */

import Bovine from '../../src/models/bovine';
import bovineTestData from '../testData/bovinesData';

// date as unix 11/10/2018 DD/MM/YYYY
const today = 1539213325;

const bovineData = bovineTestData.currentSingle;
const archiveData = {
  isArchived: true,
  deathDate: today,
  causeOfDeath: 'Lightning Strike'
};

describe('PUT /bovines/:id/archive', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .patch(`/api/bovines/${bovineData._id}/archive`)
      .send(archiveData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should correctly update the animals data', done => {
    api
      .patch(`/api/bovines/${bovineData._id}/archive`)
      .send(archiveData)
      .then(() => Bovine.findById(bovineData._id))
      .then(bovine => {
        expect(bovine.isArchived).to.be.true;
        expect(bovine.deathDate).to.be.eq(archiveData.deathDate);
        expect(bovine.causeOfDeath).to.be.eq(archiveData.causeOfDeath);
      })
      .then(() => done());
  });
});
