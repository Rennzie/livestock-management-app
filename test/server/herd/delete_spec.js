/* globals describe, it, api expect beforeEach */

const Herd = require('../../../models/herd');
const herdTestData = require('../testData/herdsData');

//--- TEST DATA ---//
const herdData = herdTestData.multiple;
const herdIds = herdTestData.herdIds;

describe('DELETE /herds/:id', () => {
  beforeEach(done => {
    Herd.deleteMany({})
      .then(() => Herd.create(herdData))
      .then(() => done());
  });

  it('should return a 204 response', done => {
    api.delete(`/api/herds/${herdIds[0]}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should remove one herd from the database', done => {
    api.delete(`/api/herds/${herdIds[0]}`)
      .then(() => Herd.find())
      .then(herds => {
        expect(herds.length).to.eq(herdData.length - 1);
        done();
      });
  });

});
