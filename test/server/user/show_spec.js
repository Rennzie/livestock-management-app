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

describe('GET /users', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get(`/api/users/${testIds[0]}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/users/${testIds[0]}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct user', done => {
    api.get(`/api/users/${testIds[0]}`)
      .end((err, res) => {
        expect(res.body._id).to.eq(userData._id);
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/users/${testIds[0]}`)
      .end((err, res) => {
        expect(res.body.username).to.eq(userData.username);
        expect(res.body.email).to.eq(userData.email);
        expect(res.body.age).to.eq(userData.age);
        expect(res.body.farmName).to.eq(userData.farmName);
        done();
      });
  });


});
