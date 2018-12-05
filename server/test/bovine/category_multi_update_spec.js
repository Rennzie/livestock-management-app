/* globals describe, it, api expect beforeEach */

import Bovine from '../../src/models/bovine';
import bovineTestData from '../testData/bovinesData';

// --- TEST DATA ---//
const bovineData = bovineTestData.currentMulti;
const { updatedCategories } = bovineTestData;

describe('PATCH /bovines/categories', () => {
  beforeEach(done => {
    Bovine.deleteMany({})
      .then(() => Bovine.create(bovineData))
      .then(() => done());
  });

  it('should return a 201 response status', done => {
    api
      .patch('/api/bovines/categories')
      .send(updatedCategories)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should update the status of each animal to the new category', done => {
    api
      .patch('/api/bovines/categories')
      .send(updatedCategories)
      .end((err, res) => {
        res.body.forEach(animal => {
          expect(animal.category).to.eq(updatedCategories.newCategory);
        });
        done();
      });
  });
});
