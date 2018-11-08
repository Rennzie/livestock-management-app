/* globals describe, it, xit, api expect beforeEach */

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
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => Herd.deleteMany({}))
      .then(() => Herd.create(herdData))
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
        expect(res.body.class).to.eq(herdData.class);
        done();
      });
  });


  xit('should return an averageWeight virtual that is a number', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        expect(res.body).to.have.property('averageWeight');
        expect(res.body.averageWeight).to.be.a('number');
        done();
      });
  });

  xit('should return a formattedWeighDate virtual for the weights array.', done => {
    api.get(`/api/herds/${herdIds[0]}`)
      .end(( err, res ) => {
        console.log('==========> ', res.body);
        expect(res.body.weights[0]).to.have.property('formattedWeighDate');
        expect(res.body.weights[0].formattedWeighDate).to.be.a('string');
        expect(res.body.weights[0].formattedWeighDate).to.not.eq('Invalid Date');
        done();
      });
  });

});
