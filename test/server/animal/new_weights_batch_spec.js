/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const animalTestData = require('../testData/animalsData');

//--- TEST DATA ---//
const animalData = animalTestData.currentMulit;
const newWeights = require('../testData/batchAnimalWeights.csv');

describe('POST /animals/weights', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(() => Animal.create(animalData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.post('/animals/weights')
      .field('Content-Type', 'multipart/form-data')
      .attach('file' ,'/Users/Sean/Development/side-projects/livestock-management-app/test/server/testData/batchAnimalWeights.csv')
      .end(( err, res ) => {
        if(err){
          console.log('the error is ', err);
        }else{
          console.log('the uploaded csv is', res.body);
        }
        done();
      });
  });

  xit('should return an array of animals', done => {

  });

  xit('should increase all the weights array by one', done => {

  });

  xit('should increase all the weights by the correct data', done => {

  });
});

[
  {
    _id: '5b91752666708bc8b1622705',
    ' weights.weight': ' 400',
    ' weight.unit': ' kgs'
  },{
    _id: '5b91752666708bc8b1622706',
    ' weights.weight': ' 400',
    ' weight.unit': ' kgs'
  },{
    _id: '5b91752666708bc8b1622707',
    ' weights.weight': ' 350',
    ' weight.unit': ' kgs'
  },{ _id: '5b91752666708bc8b1622708',
    ' weights.weight': ' 230',
    ' weight.unit': ' kgs'
  }
];
