/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const testIds = [
  '5b91752666708bc8b1622705', '5b91752666708bc8b1622706', '5b91752666708bc8b1622707', '5b91752666708bc8b1622708'
];

const animalData = [
  {
    _id: testIds[0],
    type: 'cow',
    methodOfRemoval: 'sale',
    saleRevenue: 10000,
    revenueCurrency: 'ZAR',
    saleWeight: 400,
    weightUnit: 'kgs'
  },{
    _id: testIds[1],
    type: 'cow',
    methodOfRemoval: 'sale',
    saleRevenue: 7000,
    revenueCurrency: 'ZAR',
    saleWeight: 300,
    weightUnit: 'kgs',
    weights: [{weight: 500, unit: 'kgs'}]
  }
];

describe('GET /animals', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(() => Animal.create(animalData))
      .then(() => done());
  });

  it('should return a 200 status', done => {
    api.get('/api/animals')
      .end(( err, res ) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should an array of objects', done => {
    api.get('/api/animals')
      .end((err, res) => {
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.be.an('object');
        done();
      });
  });

  it('should an array of the correct length', done => {
    api.get('/api/animals')
      .end((err, res) => {
        expect(res.body.length).to.eq(animalData.length);
        done();
      });
  });

  it('should return the correct data', done => {
    api.get('/api/animals')
      .end((err, res) => {
        res.body.forEach(animal => {
          const testSet = animalData.filter(testAnimal => animal._id.toString() === testAnimal._id)[0];

          expect(animal._id).to.eq(testSet._id);
          expect(animal.type).to.eq(testSet.type);
          expect(animal.saleRevenue).to.eq(testSet.saleRevenue);
          if(animal.weights){
            expect(animal.weights).to.be.an('array');
          }
        });
        done();
      });
  } );
});
