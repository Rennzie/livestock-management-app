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

describe('GET /animals/:id', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(() => Animal.create(animalData))
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get(`/api/animals/${testIds[0]}`)
      .end((err, res) => {
        expect(res.status).to.eq(200);
        done();
      });
  });

  it('should return an object', done => {
    api.get(`/api/animals/${testIds[0]}`)
      .end((err, res) => {
        expect(res.body).to.be.an('object');
        // expect(res.body).to.eql('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.get(`/api/animals/${testIds[0]}`)
      .end((err, res) => {
        expect(res.body._id).to.eq(animalData[0]._id);
        expect(res.body.type).to.eq(animalData[0].type);
        expect(res.body.saleRevenue).to.eq(animalData[0].saleRevenue);
        done();
      });
  });
});