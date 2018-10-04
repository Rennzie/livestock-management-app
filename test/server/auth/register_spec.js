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

const userDataOther = {
  // _id: testIds[1],
  username: 'Red-dog',
  email: 'sean.rennie6@gmail.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  firstName: 'Sean',
  surname: 'Rennie',
  age: 28,
  farmName: 'Palmiet'
};

describe('CREATE /api/register', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userDataOther))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.post('/api/register')
      .send(userData)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.post('/api/register')
      .send(userData)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.post('/api/register')
      .send(userData)
      .end(( err, res ) => {
        expect(res.body.user.username).to.eq(userData.username);
        expect(res.body.user.email).to.eq(userData.email);
        expect(res.body.user.firstName).to.eq(userData.firstName);
        expect(res.body.user.surname).to.eq(userData.surname);
        expect(res.body.user.age).to.eq(userData.age);
        done();
      });
  });

  it('should return a message', done => {
    api.post('/api/register')
      .send(userData)
      .end((err, res) =>{
        expect(!!res.body.message).to.be.true;
        done();
      });
  });

  it('should have a hashed password', done => {
    api.post('/api/register')
      .send(userData)
      .end(( err, res ) => {
        expect(res.body.user.password).to.not.eq(userData.password);
        done();
      });
  });

  // NOTE: still need to test the validation errors
  xit('should return a validation error if the email already exists', done => {

    httpRequest({method: 'POST', uri: '/register', resolveWithFullResponse: true, body: userDataOther, json: true
    }).then((response) => {
    //oh no if we reached here than no exception was thrown
    }).catch(function (response) {
      expect(400).to.equal(response.statusCode);
      done();
    });
});
// // api.post('/api/register')
  //   // .send(userDataOther)
  //   // .end(( err, res ) => {
  //     // console.log('the results is: ===> ', res.error);
  //     expect(User.create(userDataOther)).to.throw('ValidationError');
  //     done();
  //   // });

  xit('should return a validation error if the username already exists', done => {
    api.post('/api/register')
      .send(userData)
      .end(( err ) => {
        expect(err.name).to.eq('ValidationError');
        done();
      });
  });
});
