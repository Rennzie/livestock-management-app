/* globals describe, it, api expect beforeEach  */

const Class = require('../../../models/class');
const classTestData = require('../testData/classData');

//--- TEST DATA ---//
const classData = classTestData.single;

describe('GET /api/classes/:classId', () => {
  beforeEach(done => {
    Class.deleteMany({})
      .then(() => Class.create(classData))
      .then(() => done());
  });

  it('should return a 200 status', done => {
    api.get(`/api/classes/${classData._id}`)
      .end(( err, res ) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return a total animals virtual', done => {
    api.get(`/api/classes/${classData._id}`)
      .end(( err, res ) => {
        console.log('========> ', res.body)
        expect(res.body).to.have.property('totalAnimals');
        expect(res.body.totalAnimals).to.be.a('number');
        done();
      });
  });

  xit('should return the correct data', done => {

  });

});
