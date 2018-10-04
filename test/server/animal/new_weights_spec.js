/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const User = require('../../../models/user');

const testIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const animalData = {
  _id: testIds[0],
  type: 'cow',
  owners: [ testIds[1] ],
  weights: [{weight: 250, units: 'kgs'}]
};

const newWeight = {
  _id: testIds[2],
  weight: 350,
  unit: 'kgs'
};

const userData = {
  _id: testIds[1],
  username: 'Rennzie',
  email: 'rnnsea001@gmail.com',
  password: 'pass',
  passwordConfirmation: 'pass',
  firstName: 'Sean',
  surname: 'Rennie',
  age: 28,
  farmName: 'Palmiet'
};

describe('POST /animal/:id/weights', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(() => Animal.create(animalData))
      .then(() => User.create(userData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.post(`/api/animals/${testIds[0]}/weights`)
      .send(newWeight)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object which contains a weights array', done => {
    api.post(`/api/animals/${testIds[0]}/weights`)
      .send(newWeight)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        expect(res.body.weights).to.be.an('array');
        done();
      });
  });

  it('should increase the length of the weights array by one if it exists', done => {
    api.post(`/api/animals/${testIds[0]}/weights`)
      .send(newWeight)
      .end(( err, res ) => {
        expect(res.body.weights.length).to.eq(animalData.weights.length + 1);
        done();
      });
  });

  it('should return the correct data', done => {
    api.post(`/api/animals/${testIds[0]}/weights`)
      .send(newWeight)
      .end(( err, res ) => {
        const updatedWeight = res.body.weights.filter(weight => weight._id === testIds[2])[0];
        expect(updatedWeight.weight).to.eq(newWeight.weight);
        expect(updatedWeight.units).to.eq(newWeight.units);
        done();
      });
  });

});
