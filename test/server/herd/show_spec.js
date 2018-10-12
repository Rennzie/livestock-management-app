/* globals describe, it, api expect beforeEach */

const Herd = require('../../../models/herd');
const Bovine = require('../../../models/bovine');
const herdTestData = require('../testData/herdsData');
const bovineTestData = require('../testData/bovinesData');

//--- TEST DATA ---//
const herdData = herdTestData.single;
const herdIds = herdTestData.herdIds;
const bovineData = bovineTestData.currentMulti;

describe('SHOW herds/:id', () => {
  beforeEach(done => {
    Herd.deleteMany({})
      .then(() => Herd.create(herdData))
      .then(() => Bovine.deleteMany({}))
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        expect(res.body._id).to.eq(herdData._id);
        expect(res.body.name).to.eq(herdData.name);
        expect(res.body.animals).to.eql(herdData.animals);
        expect(res.body.category).to.eq(herdData.category);
        done();
      });
  });

  it('should return a key of averageBirth', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        console.log('========>', res.body)
        expect(res.body).to.have.property('animals2');
        expect(res.body.averageBirth).to.be.an('array');
        done();
      });
  });

});
