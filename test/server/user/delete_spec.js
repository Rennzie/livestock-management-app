/* globals describe, xit, it, api expect beforeEach */

const User = require('../../../models/user');
const testIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const userData = [
  {
    _id: testIds[0],
    username: 'Rennzie',
    email: 'rnnsea001@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    firstName: 'Sean',
    surname: 'Rennie',
    age: 28,
    farmName: 'Palmiet'
  },{
    _id: testIds[1],
    username: 'Mike',
    email: 'palmiet.rennie@gmail.com',
    password: 'pass',
    passwordConfirmation: 'pass',
    firstName: 'Michael',
    surname: 'Rennie',
    age: 57,
    farmName: 'Palmiet'
  }
];


describe('DELETE /users/:id', () => {
  beforeEach(done => {
    User.deleteMany({})
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 204 response', done => {
    api.delete(`/api/users/${testIds[0]}`)
      .end((err, res) => {
        expect(res.status).to.eq(204);
        done();
      });
  });

  it('should delete one user', done => {
    api.delete(`/api/users/${testIds[0]}`)
      .then(() => User.find())
      .then(users => {
        expect(users.length).to.eq(userData.length - 1 );
        done();
      });
  });

  xit('should delete the correct user', done => {
    api.get(`/api/users/${testIds[0]}`)
      .then(() => User.find())
      .then(users => {
        const isNotIncluded = users.filter(user => user._id !== testIds[0]);
        expect(!!isNotIncluded.length).to.be.false;
        done();
      });
  });
});
