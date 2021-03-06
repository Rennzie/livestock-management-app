/* globals describe, it, api expect beforeEach */

import Bovine from '../../src/models/bovine';
import bovineTestData from '../testData/bovinesData';

const bovineData = bovineTestData.currentSingle;

describe('POST /bovines', () => {
  beforeEach(done => {
    Bovine.deleteMany({}).then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .post('/api/bovines')
      .send(bovineData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api
      .post('/api/bovines')
      .send(bovineData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/bovines')
      .send(bovineData)
      .end((err, res) => {
        expect(res.body.category).to.eq(bovineData.category);
        expect(res.body.breed).to.eq(bovineData.breed);
        // expect(res.body.weights).to.eq(bovineData.weights);
        expect(res.body.birthDate).to.eql(bovineData.birthDate);
        done();
      });
  });
});
