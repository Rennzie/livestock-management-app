/* globals describe, it, api expect beforeEach  */

import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryTestData.single;
describe('DELETE /api/categories/:categoryId', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(categoryData))
      .then(() => done());
  });

  it('should return a 202 status code ', done => {
    api.delete(`/api/categories/${categoryData._id}`).end((err, res) => {
      expect(res.status).to.eq(202);
      done();
    });
  });

  it('should return a "Category Deleted" message ', done => {
    api.delete(`/api/categories/${categoryData._id}`).end((err, res) => {
      expect(res.body.message).to.eq('Category Deleted');
      done();
    });
  });

  it('should remove the category from the Category model ', done => {
    api
      .delete(`/api/categories/${categoryData._id}`)
      .then(() => Category.findById(categoryData._id))
      .then(categories => {
        // eslint-disable-next-line no-unused-expressions
        expect(!categories).to.be.true;
        done();
      });
  });
});
