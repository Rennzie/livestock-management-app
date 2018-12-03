/* eslint-disable no-unused-expressions */
/* globals describe, xit, it, api expect beforeEach */

const User = require('../../../src/models/user');

const testData = require('../testData/usersData');

const userData = testData.single;
const otherUserData = testData.other;

describe('CREATE /api/register', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(otherUserData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body.user.username).to.eq(userData.username);
        expect(res.body.user.email).to.eq(userData.email);
        expect(res.body.user.firstName).to.eq(userData.firstName);
        expect(res.body.user.surname).to.eq(userData.surname);
        done();
      });
  });

  it('should return a message', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(!!res.body.message).to.be.true;
        done();
      });
  });

  it('should have a hashed password', done => {
    api
      .post('/api/register')
      .send(userData)
      .end((err, res) => {
        expect(res.body.user.password).to.not.eq(userData.password);
        done();
      });
  });

  // NOTE: still need to test the validation errors
  xit('should return a validation error if the email already exists', done => {
    httpRequest({
      method: 'POST',
      uri: '/register',
      resolveWithFullResponse: true,
      body: otherUserData,
      json: true
    })
      .then(response => {
        // oh no if we reached here than no exception was thrown
      })
      .catch(response => {
        expect(400).to.equal(response.statusCode);
        done();
      });
  });
  // // api.post('/api/register')
  //   // .send(otherUserData)
  //   // .end(( err, res ) => {
  //     // console.log('the results is: ===> ', res.error);
  //     expect(User.create(otherUserData)).to.throw('ValidationError');
  //     done();
  //   // });

  xit('should return a validation error if the username already exists', done => {
    api
      .post('/api/register')
      .send(userData)
      .end(err => {
        expect(err.name).to.eq('ValidationError');
        done();
      });
  });
});
