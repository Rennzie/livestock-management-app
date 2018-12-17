/* globals describe, it, api expect beforeEach  */

import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryTestData.single;
let changeId = '';

describe('DELETE /api/categories/:categoryId/changes/:changeId', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(categoryData))
      .then(category => {
        changeId = category.currentMonthChanges[0]._id;
      })
      .then(() => done());
  });

  it('should return a 202 status code ', done => {
    api.delete(`/api/categories/${categoryData._id}/changes/${changeId}`).end((err, res) => {
      expect(res.status).to.eq(202);
      done();
    });
  });

  it('should return a "Change Deleted" message ', done => {
    api.delete(`/api/categories/${categoryData._id}/changes/${changeId}`).end((err, res) => {
      expect(res.body.message).to.eq('Change Deleted');
      done();
    });
  });

  it('should remove the change from the Category model ', done => {
    api
      .delete(`/api/categories/${categoryData._id}/changes/${changeId}`)
      .then(() => Category.findById(categoryData._id))
      .then(category => {
        const change = category.currentMonthChanges.id(changeId);
        // eslint-disable-next-line no-unused-expressions
        expect(!change).to.be.true;
        done();
      });
  });
});
