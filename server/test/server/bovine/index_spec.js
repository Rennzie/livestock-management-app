/* globals describe, it, api expect beforeEach */

const Bovine = require('../../../src/models/bovine');
const bovineTestData = require('../testData/bovinesData');

const bovineData = bovineTestData.archivedMulti;

describe('GET /bovines', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 200 status', done => {
    api.get('/api/bovines').end((err, res) => {
      expect(res.status).to.eq(200);
      done();
    });
  });

  it('should an array of objects', done => {
    api.get('/api/bovines').end((err, res) => {
      expect(res.body).to.be.an('array');
      expect(res.body[0]).to.be.an('object');
      done();
    });
  });

  it('should an array of the correct length', done => {
    api.get('/api/bovines').end((err, res) => {
      expect(res.body.length).to.eq(bovineData.length);
      done();
    });
  });

  it('should return the correct data', done => {
    api.get('/api/bovines').end((err, res) => {
      res.body.forEach(bovine => {
        const testSet = bovineData.filter(
          testBovine => bovine._id.toString() === testBovine._id
        )[0];

        expect(bovine._id).to.eq(testSet._id);
        expect(bovine.type).to.eq(testSet.type);
        expect(bovine.saleRevenue).to.eq(testSet.saleRevenue);
        if (bovine.weights) {
          expect(bovine.weights).to.be.an('array');
        }
      });
      done();
    });
  });
});
