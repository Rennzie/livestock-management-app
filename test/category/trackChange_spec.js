/* globals describe, it, api expect beforeEach  */

import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryTestData.single;
const { trackedChange } = categoryTestData;

describe('POST /api/categories/:categoryId/changes', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(categoryData))
      .then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .post(`/api/categories/${categoryData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should add the correct data to the correct category', done => {
    api
      .post(`/api/categories/${categoryData._id}/changes`)
      .send(trackedChange)
      .end((err, res) => {
        expect(res.body._id).to.eq(categoryData._id);
        expect(res.body.currentMonthChanges.pop()._id).to.eq(trackedChange._id);
        done();
      });
  });
});
