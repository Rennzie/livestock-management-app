/* globals describe, xit, it, api expect beforeEach */

const User = require('../../../models/user');

const testData = require('../testData/usersData');

const userData = testData.single;
const updatedData = testData.update;

describe('PUT /users/:id', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .put(`/api/users/${userData._id}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api
      .put(`/api/users/${userData._id}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct user', done => {
    api
      .put(`/api/users/${userData._id}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body._id).to.eq(userData._id);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .put(`/api/users/${userData._id}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body.username).to.eq(updatedData.username);
        expect(res.body.firstName).to.eq(updatedData.firstName);
        expect(res.body.age).to.eq(updatedData.age);
        expect(res.body.farmName).to.eq(updatedData.farmName);
        done();
      });
  });

  it('should not change the other data', done => {
    api
      .put(`/api/users/${userData._id}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body.surname).to.eq(userData.surname);
        expect(res.body.email).to.eq(userData.email);
        done();
      });
  });
});
