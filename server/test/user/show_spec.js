/* globals describe, it, api expect beforeEach */

import User from '../../src/models/user';

import testData from '../testData/usersData';

const userData = testData.single;

describe('GET /users', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get(`/api/users/${userData._id}`).end((err, res) => {
      expect(res.status).to.eq(200);
      done();
    });
  });

  it('should return an object', done => {
    api.get(`/api/users/${userData._id}`).end((err, res) => {
      expect(res.body).to.be.an('object');
      done();
    });
  });

  it('should return the correct user', done => {
    api.get(`/api/users/${userData._id}`).end((err, res) => {
      expect(res.body._id).to.eq(userData._id);
      done();
    });
  });

  it('should return the correct data', done => {
    api.get(`/api/users/${userData._id}`).end((err, res) => {
      expect(res.body.username).to.eq(userData.username);
      expect(res.body.email).to.eq(userData.email);
      expect(res.body.farmName).to.eq(userData.farmName);
      done();
    });
  });
});
