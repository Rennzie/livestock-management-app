/* globals describe, it, api expect beforeEach  */

import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryTestData.single;

describe('POST /api/categories', () => {
  beforeEach(done => {
    Category.deleteMany({}).then(() => done());
  });

  it('should return a 201 response', done => {
    api
      .post('/api/categories')
      .send(categoryData)
      .end((err, res) => {
        expect(res.status).to.eq(201);
        done();
      });
  });

  it('should return the correct data', done => {
    api
      .post('/api/categories')
      .send(categoryData)
      .end((err, res) => {
        expect(res.body._id).to.eq(categoryData._id);
        expect(res.body.name).to.eq(categoryData.name);
        expect(res.body.class).to.eq(categoryData.class);
        expect(res.body.change).to.eql(categoryData.change);
        done();
      });
  });
});
