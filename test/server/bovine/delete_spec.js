/* globals describe, it, api expect beforeEach */

const Bovine = require('../../../models/bovine');
const bovineTestData = require('../testData/bovinesData');

const testIds = bovineTestData.bovineIds;
const bovineData = bovineTestData.archivedMulti;

describe('DELETE /bovines/:id', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 204 response', done => { // NOTE: get correct
    api.delete(`/api/bovines/${testIds[0]}`)
      .end(( err, res ) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should remove one item from the database', done => {
    api.delete(`/api/bovines/${testIds[0]}`)
      .then(() => Bovine.find())
      .then(bovines => {
        // console.log('the bovines are: ', bovines);
        expect(bovines.length).to.eq(bovineData.length - 1);
        done();
      });
  });

});
