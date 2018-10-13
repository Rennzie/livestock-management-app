// /* globals describe, it, api expect beforeEach */
//
// const Herd = require('../../../models/herd');
// const herdTestData = require('../testData/herdsData');
// const bovineTestData = require('../testData/bovinesData');
//
// //--- TEST DATA ---//
// const herdData = herdTestData.singleManyAnimals;
// const bovineIds = bovineTestData.bovineIds;
//
// describe('DELETE /herds/:id/animals', () => {
//   beforeEach(done => {
//     Herd.deleteMany({})
//       .then(() => Herd.create(herdData))
//       .then(() => done());
//   });
//
//   it('should return a 204 status', done => {
//     api.delete(`/api/herds/${herdData._id}/animals`)
//       .send(bovineIds)
//       .end(( err, res ) => {
//         expect(res.status).to.eq(204);
//         done();
//       });
//   });
//
//   it('should reduce the animals array by the correct amount', done => {
//     api.delete(`/api/herds/${herdData._id}/animals`)
//       .send(bovineIds)
//       .then(() => Herd.findById(herdData._id))
//       .then(herd => {
//         expect(herd.animals.length).to.eq(herdData.animals.length - bovineIds.length);
//         done();
//       });
//   });
//
//   it('should remove the correct ids', done => {
//     api.delete(`/api/herds/${herdData._id}/animals`)
//       .send(bovineIds)
//       .then(() => Herd.findById(herdData._id))
//       .then(herd => {
//         const animals = herd.animals;
//         // NOTE: will need this when start populating the herd
//         // res.body.animals.forEach(animal => animals.push(animal));
//         bovineIds.forEach(id => {
//           expect(animals).to.not.include(id);
//         });
//         done();
//       });
//   });
//
// });
