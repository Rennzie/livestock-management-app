/* globals describe, it, api expect beforeEach  */

import Farm from '../../src/models/farm';
import User from '../../src/models/user';
import Category from '../../src/models/category';

import farmTestData from '../testData/farmData';
import userTestData from '../testData/usersData';
import categoryTestData from '../testData/classData';

// --- TEST DATA ---//
const userData = userTestData.single;
const farmData = farmTestData.single;
const categoryData = categoryTestData.multi;

describe('GET /api/farms/:id', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => Farm.deleteMany({}))
      .then(() => Farm.create(farmData))
      .then(() => Category.deleteMany({}))
      .then(() => Category.create(categoryData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get(`/api/farms/${farmData._id}`).end((err, res) => {
      expect(res.status).to.eq(200);
      done();
    });
  });

  it('should return an object with a name property', done => {
    api.get(`/api/farms/${farmData._id}`).end((err, res) => {
      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('name');
      done();
    });
  });

  // NOTE: this test failing because the categories wont fill with foreign fields as expected

  it('should return a categories key which is an array of objects with a class property', done => {
    api.get(`/api/farms/${farmData._id}`).end((err, res) => {
      console.log('the response body is ', res.body);

      expect(res.body).to.have.property('categories');
      expect(res.body.categories).to.be.an('array');
      expect(res.body.categories[0]).to.be.an('object');
      expect(res.body.categories[0]).to.have.property('class');
      done();
    });
  });
});
