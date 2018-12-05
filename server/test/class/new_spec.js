/* globals describe, it, api expect beforeEach  */

import Class from '../../src/models/class';
import classTestData from '../testData/classData';

// --- TEST DATA ---//
const classData = classTestData.single;

describe('POST /api/classes', () => {
  beforeEach(done => {
    Class.deleteMany({}).then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .post('/api/classes')
      .send(classData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/classes')
      .send(classData)
      .end((err, res) => {
        expect(res.body._id).to.eq(classData._id);
        expect(res.body.name).to.eq(classData.name);
        expect(res.body.class).to.eq(classData.class);
        expect(res.body.change).to.eql(classData.change);
        done();
      });
  });
});
