/* globals describe, it, api expect beforeEach */

const Herd = require('../../../models/herd');
const herdTestData = require('../testData/herdsData');
const bovineTestData = require('../testData/bovinesData');

//--- TEST DATA ---//
const herdData = herdTestData.single;
const herdIds = herdTestData.herdIds;
const bovineIds = bovineTestData.bovineIds;


describe('POST /herds/:id/animals', () => {
  beforeEach(done => {
    Herd.deleteMany({})
      .then(() => Herd.create(herdData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api.post(`/api/herds/${herdData._id}/animals`)
      .send(bovineIds)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should update the animals array with all the new ids', done => {
    api.post(`/api/herds/${herdData._id}/animals`)
      .send(bovineIds)
      .end((err, res) => {
        const animals = res.body.animals;
        // NOTE: will need this when start populating the herd
        // res.body.animals.forEach(animal => animals.push(animal));
        bovineIds.forEach(id => {
          expect(animals).to.include(id);
        })
        done();
      });
  });

  it('should have a unique set of animals', done => {
    api.post(`/api/herds/${herdData._id}/animals`)
      .send(bovineIds)
      .end((err, res) => {
        const returnedArray = res.body.animals;
        const uniqueArray = [ ...new Set(returnedArray) ]
        expect(returnedArray.length).to.eq(uniqueArray.length);
        done();
      });
  });
});
