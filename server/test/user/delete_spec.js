/* globals describe, it, api expect beforeEach */

const User = require('../../src/models/user');

const testData = require('../testData/usersData');

const userData = testData.single;

describe('DELETE /users/:id', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 204 response', done => {
    api.delete(`/api/users/${userData._id}`).end((err, res) => {
      expect(res.status).to.eq(204);
      done();
    });
  });

  it('should delete the correct user', done => {
    api
      .get(`/api/users/${userData._id}`)
      .then(() => User.find())
      .then(users => {
        const userIds = [];
        users.forEach(user => userIds.push(user._id));
        expect(userIds).to.not.include(userData._id);
        done();
      });
  });
});
