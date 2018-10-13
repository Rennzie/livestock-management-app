/* globals describe, it, api expect beforeEach  */

const Herd = require('../../../models/herd');
const Bovine = require('../../../models/bovine');

const herdTestData = require('../testData/herdsData');
const bovineTestData = require('../testData/bovinesData');

//--- TEST DATA ---//
const herdData = herdTestData.single2;
const bovineData = bovineTestData.currentMulti;
const bovineIds = bovineTestData.bovineIds;

describe('POST /herds/:id/animals', () => {
  beforeEach( done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => Herd.deleteMany({}))
      .then(() => Herd.create(herdData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.patch(`/api/herds/${herdData._id}/animals`)
      .send(bovineIds)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should update each bovines herd to the new herd', done => {
    api.patch(`/api/herds/${herdData._id}/animals`)
      .send(bovineIds)
      .then(() => Bovine.find())
      .then(bovines => {
        bovines.forEach(bovine => {
          expect(bovine.herd.toString()).to.eq(herdData._id);
        });
        done();
      });
  });

});
