/* globals describe, it, api expect beforeEach */

const Animal = require('../../../models/animal');
const animalTestData = require('../testData/animalsData');

const testIds = animalTestData.animalIds;
const animalData = animalTestData.archivedMulti;
const updateData = animalTestData.archivedSingleEdit;

describe('PUT /animals/:id', () => {
  beforeEach(done => {
    Animal.deleteMany({})
      .then(() => Animal.create(animalData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.put(`/api/animals/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return an object', done => {
    api.put(`/api/animals/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.body).to.be.an('object');
        done();
      });
  });

  it('should return the correct data', done => {
    api.put(`/api/animals/${testIds[0]}`)
      .send(updateData)
      .end(( err, res ) => {
        expect(res.body.saleRevenue).to.eq(updateData.saleRevenue);
        expect(res.body.methodOfRemoval).to.eq(updateData.methodOfRemoval);
        expect(res.body.weight).to.eq(updateData.weight);
        done();
      });

  });
});
