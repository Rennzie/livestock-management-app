/* globals describe, it, api expect beforeEach */

const Bovine = require('../../../models/bovine');
const bovineTestData = require('../testData/bovinesData');

//--- TEST DATA ---//
const testIds = bovineTestData.bovineIds;
const bovineData = bovineTestData.archivedMulti;

describe('GET /bovines/:id', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get(`/api/bovines/${testIds[0]}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/bovines/${testIds[0]}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        // expect(res.body).to.eql('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/bovines/${testIds[0]}`)
      .end((err, res) => {
        expect(res.body._id).to.eq(bovineData[0]._id);
        expect(res.body.type).to.eq(bovineData[0].type);
        expect(res.body.saleRevenue).to.eq(bovineData[0].saleRevenue);
        done();
      });
  });
});
