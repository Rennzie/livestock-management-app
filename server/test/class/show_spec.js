/* globals describe, it, api expect beforeEach  */

import Class from '../../src/models/class';
import classTestData from '../testData/classData';

// --- TEST DATA ---//
const classData = classTestData.single;

describe('GET /api/classes/:classId', () => {
  beforeEach(done => {
    Class.deleteMany({})
      .then(() => Class.create(classData))
      .then(() => done());
  });

  it('should return a 200 status', done => {
    api.get(`/api/classes/${classData._id}`).end((err, res) => {
      expect(res.status).to.eq(200);
      done();
    });
  });

  // xit('should return the correct data', done => {});
});
