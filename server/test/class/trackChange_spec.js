/* globals describe, it, api expect beforeEach  */

import Class from '../../src/models/class';
import classTestData from '../testData/classData';

// --- TEST DATA ---//
const classData = classTestData.single;
const { trackedChange } = classTestData;

describe('POST /api/class/:classId/changes', () => {
  beforeEach(done => {
    Class.deleteMany({})
      .then(() => Class.create(classData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .post(`/api/classes/${classData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should add the correct data to the correct class', done => {
    api
      .post(`/api/classes/${classData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        expect(res.body._id).to.eq(classData._id);
        expect(res.body.currentMonthChanges.pop()._id).to.eq(trackedChange._id);
        done();
      });
  });
});
