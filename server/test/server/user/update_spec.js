/* globals describe, xit, it, api expect beforeEach */

const User = require('../../../models/user');
const testIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const userData = {
  _id: testIds[0],
  username: 'Rennzie',
  email: 'rnnsea001@gmail.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  firstName: 'Sean',
  surname: 'Rennie',
  age: 28,
  farmName: 'Palmiet'
};

const updatedData = {
  username: 'Pennzie',
  firstName: 'Pean',
  age: 29,
  farmName: 'Kraai Kop'
};

describe('PUT /users/:id', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.put(`/api/users/${testIds[0]}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/users/${testIds[0]}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct user', done => {
    api.put(`/api/users/${testIds[0]}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body._id).to.eq(userData._id);
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/users/${testIds[0]}`)
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
    api.put(`/api/users/${testIds[0]}`)
      .send(updatedData)
      .end((err, res) => {
        expect(res.body.surname).to.eq(userData.surname);
        expect(res.body.email).to.eq(userData.email);
        done();
      });
  });
});
