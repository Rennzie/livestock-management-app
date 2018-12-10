/* globals describe, it, api expect beforeEach  */

import Category from '../../src/models/category';
import categoryDate from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryDate.single;

describe('GET /api/categories/:classId', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(categoryData))
      .then(() => done());
  });

  it('should return a 200 status', done => {
    api.get(`/api/categories/${categoryData._id}`).end((err, res) => {
      expect(res.status).to.eq(200);
      done();
    });
  });

  // xit('should return the correct data', done => {});
});
