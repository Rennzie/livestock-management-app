/* eslint-disable no-unused-expressions */
/* globals describe, it, api expect beforeEach */

import jwt from 'jsonwebtoken';
import User from '../../src/models/user';
import { SECRET } from '../../src/config/environment';

import testData from '../testData/usersData';

const userData = testData.single;
const userLogin = testData.login;
const userLoginWrong = testData.loginWrong;

// create a user before each test
// try to login with that user
//      > return a 401 with no login details
//      > return a 201 with good login
//      > return a valid JWT token

describe('LOGIN /api/login', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 401 without credentials', done => {
    api
      .post('/api/login')
      .send(userLoginWrong)
      .end((err, res) => {
        console.log('message', res.body.message);
        expect(res.status).to.eq(401);
        done();
      });
  });

  it('should return a 201 with credentials', done => {
    api
      .post('/api/login')
      .send(userLogin)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return a valid JWT token', done => {
    api
      .post('/api/login')
      .send(userLogin)
      .end((err, res) => {
        expect(jwt.verify(res.body.token, SECRET)).to.ok;
        done();
      });
  });
});
