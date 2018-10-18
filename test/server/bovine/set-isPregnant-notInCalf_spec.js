/* globals describe, it, api expect  beforeEach*/

const Bovine = require('../../../models/bovine');
const bovineTestData = require('../testData/bovinesData');

//--- TEST DATA ---//
const bovineData = bovineTestData.currentMulti;
const setPregnant = {
  ids: bovineTestData.updatedCategories.ids,
  key: 'isPregnant'
};
const setNotInCalf = {
  ids: bovineTestData.updatedCategories.ids,
  key: 'notInCalf'
};

describe('PATCH /bovines/pregnancy', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should change isPregnant to be true', done => {
    api.patch('/api/bovines/pregnant')
      .send(setPregnant)
      .end(() => {
        Bovine.find({_id: {$in: setPregnant.ids}})
          .then(bovines => {
            bovines.forEach(animal => expect(animal.breeding.isPregnant).to.be.true);
            done();
          });
      });
  });

  it('should change notInCalf to be true', done => {
    api.patch('/api/bovines/pregnant')
      .send(setNotInCalf)
      .end(() => {
        Bovine.find({_id: {$in: setNotInCalf.ids}})
          .then(bovines => {
            bovines.forEach(animal => expect(animal.breeding.notInCalf).to.be.true);
            done();
          });
      });
  });

  it('should return a 201 response', done => {
    api.patch('/api/bovines/pregnant')
      .send(setPregnant)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

});
