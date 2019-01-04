/* globals describe, it, api expect beforeEach  */

import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryTestData.single;
const categoryUpdate = categoryTestData.update;

describe('PUT /api/categories/:categoryId/', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(categoryData))
      .then(() => done());
  });

  it('should return a 202 response status', done => {
    api
      .put(`/api/categories/${categoryData._id}`)
      .send(categoryUpdate)
      .end((err, res) => {
        expect(res.status).to.eq(202);
        done();
      });
  });

  it('should update the changes with the correct info ', done => {
    api
      .put(`/api/categories/${categoryData._id}`)
      .send(categoryUpdate)
      .end((err, res) => {
        expect(res.body.category).to.eq(categoryUpdate.category);
        expect(res.body.stockUnitFactor).to.eq(categoryUpdate.stockUnitFactor);
        done();
      });
  });
});
