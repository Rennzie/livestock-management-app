/* globals describe, it, api expect beforeEach  */

const moment = require('moment');

const Herd = require('../../../models/herd');
const herdTestData = require('../testData/herdsData');

//--- TEST DATA ---//
const herdData = herdTestData.single;
const changeData = {
  createAt: moment(),
  reasonForChange: 'sale',
  animalsMoved: 200,
  notes: 'add 200 animals to herd'
};

describe('POST /api/herds/:id/changes', () => {

  beforeEach( done => {
    Herd.deleteMany({})
      .then(() => Herd.create(herdData))
      .then(() => done());
  });

  xit('should return a 201 response', done => {
    api.post(`/api/herds/${herdData._id}/changes`)
      .send(changeData)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  xit('should add an object to the herds changes array', done => {
    api.post(`/api/herds/${herdData._id}/changes`)
      .send(changeData)
      .end(( err, res ) => {
        expect(res.body.changes).to.be.an('array');
        expect(res.body.changes[0]).to.be.an('object');
        done();
      });
  });

  xit('should add the correct data to the changes array', done => {
    api.post(`/api/herds/${herdData._id}/changes`)
      .send(changeData)
      .end(( err, res ) => {
        expect(res.body.changes[0]).to.eql(changeData);
        done();
      });
  });

});
