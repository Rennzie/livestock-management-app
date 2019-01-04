/* globals describe, it, api expect beforeEach  */

import Farm from '../../src/models/farm';
import User from '../../src/models/user';
import Category from '../../src/models/category';
import farmTestData from '../testData/farmData';
import userTestData from '../testData/usersData';

// --- TEST DATA ---//
const farmData = farmTestData.single;
const userData = userTestData.single;

describe('POST /api/farms', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => Farm.deleteMany({}))
      .then(() => done());
  });

  it('should should return a 201 response', done => {
    api
      .post('/api/farms')
      .send(farmData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/farms')
      .send(farmData)
      .end((err, res) => {
        expect(res.body.name).to.eq(farmData.name);
        expect(res.body._id).to.eq(farmData._id);
        expect(res.body.farmOwner).to.eq(farmData.farmOwner);
        done();
      });
  });

  it('should create default categories with the farms id', done => {
    api
      .post('/api/farms')
      .send(farmData)
      .then(() => Category.find({ farm: farmData._id }))
      .then(categories => {
        expect(categories.length).to.be.above(0);
        done();
      });
  });
});
