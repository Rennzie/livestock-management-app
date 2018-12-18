/* globals describe, it, api expect beforeEach  */

import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryTestData.single;
let changeId = '';

describe('GET /api/categories/:categoryId/changes/:changeId', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(categoryData))
      .then(category => {
        changeId = category.currentMonthChanges[0]._id;
      })
      .then(() => done());
  });

  it('should return a 200 response', done => {
    api.get(`/api/categories/${categoryData._id}/changes/${changeId}`).end((err, res) => {
      expect(res.status).to.eq(200);
      done();
    });
  });

  it('should return an object with the keys, "createdAt", "animalsMoved", "reasonForChange"', done => {
    api.get(`/api/categories/${categoryData._id}/changes/${changeId}`).end((err, res) => {
      console.log('the change is', res.body);

      expect(res.body).to.be.an('object');
      expect(res.body).to.have.property('animalsMoved');
      expect(res.body).to.have.property('reasonForChange');
      expect(res.body).to.have.property('createdAt');
      done();
    });
  });

  it('should return the correct change', done => {
    api.get(`/api/categories/${categoryData._id}/changes/${changeId}`).end((err, res) => {
      expect(res.body._id.toString()).to.eq(changeId.toString());
      done();
    });
  });
});
