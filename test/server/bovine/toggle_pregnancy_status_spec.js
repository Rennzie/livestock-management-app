/* globals describe, it, api expect  before*/

const Bovine = require('../../../models/bovine');
const bovineTestData = require('../testData/bovinesData');

//--- TEST DATA ---//
const bovineData = bovineTestData.currentMulti;
const toggledBovineIds = bovineTestData.updatedCategories.ids;

describe('PATCH /bovines/pregnancy', () => {
  before(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should change isPregnant to be true', done => {
    api.patch('/api/bovines/pregnant')
      .send(toggledBovineIds)
      .end(() => {
        Bovine.find({_id: {$in: toggledBovineIds}})
          .then(bovines => {
            bovines.forEach(animal => expect(animal.breeding.isPregnant).to.be.true);
            done();
          });
      });
  });

  it('should change isPregnant to be false', done => {
    api.patch('/api/bovines/pregnant')
      .send(toggledBovineIds)
      .end(() => {
        Bovine.find({_id: {$in: toggledBovineIds}})
          .then(bovines => {
            bovines.forEach(animal => expect(animal.breeding.isPregnant).to.be.false);
            done();
          });
      });
  });

  it('should return a 201 response', done => {
    api.patch('/api/bovines/pregnant')
      .send(toggledBovineIds)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

});
