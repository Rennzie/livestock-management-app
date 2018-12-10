/* globals describe, it, api expect beforeEach  */

import Farm from '../../src/models/farm';
import User from '../../src/models/user';
// import Category from '../../src/models/class';

import farmTestData from '../testData/farmData';
import userTestData from '../testData/usersData';
// import categoryTestData from '../testData/classData';

// --- TEST DATA ---//
const userData = userTestData.single;
const farmData = farmTestData.multi;
// const categoryData = categoryTestData.multi;

/**
 *  Every request for farms needs to have a user id sent with it
 *  this id will be used to filter the returned farms
 *
 *  Add another farm to the farm data
 *  Write the tests to make sure only one farm is returned
 */

describe('GET /api/users/:userId/farms', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => Farm.deleteMany({}))
      .then(() => Farm.create(farmData))
      //   .then(() => Category.deleteMany({}))
      //   .then(() => Category.create(categoryData))
      .then(() => done());
  });

  it('should return a 200 response from the server', done => {
    api.get(`/api/users/${userData._id}/farms`).end((err, res) => {
      expect(res.status).to.eq(200);
      done();
    });
  });

  it('should only return a single farm', done => {
    api.get(`/api/users/${userData._id}/farms`).end((err, res) => {
      expect(res.body.length).to.eq(1);
      done();
    });
  });

  it('should return the correct farm', done => {
    api.get(`/api/users/${userData._id}/farms`).end((err, res) => {
      console.log('the farm data is ', res.body.farmOwner);
      expect(res.body[0].farmOwner).to.eq(userData._id);
      done();
    });
  });
});
