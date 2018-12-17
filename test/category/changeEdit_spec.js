/* globals describe, it, api expect beforeEach  */

import Category from '../../src/models/category';
import categoryTestData from '../testData/categoryData';

// --- TEST DATA ---//
const categoryData = categoryTestData.single;
const changeUpdate = categoryTestData.changeEdit;
let changeId = '';

describe('PUT /api/categories/:categoryId/changes/:changeId', () => {
  beforeEach(done => {
    Category.deleteMany({})
      .then(() => Category.create(categoryData))
      .then(category => {
        changeId = category.currentMonthChanges[0]._id;
      })
      .then(() => done());
  });

  it('should return a 202 updated status', done => {
    api
      .put(`/api/categories/${categoryData._id}/changes/${changeId}`)
      .send(changeUpdate)
      .end((err, res) => {
        expect(res.status).to.eq(202);
        done();
      });
  });

  it('should update the changes with the correct info', done => {
    api
      .put(`/api/categories/${categoryData._id}/changes/${changeId}`)
      .send(changeUpdate)
      .end((err, res) => {
        const updatedChange = res.body.currentMonthChanges.filter(
          change => change._id.toString() === changeId.toString()
        )[0];

        expect(updatedChange.reasonForChange).to.eq(changeUpdate.reasonForChange);
        expect(updatedChange.animalsMoved).to.eq(changeUpdate.animalsMoved);
        done();
      });
  });

  // it('should update the currentMonthDetail correctly', done => {
  //   api.put(`/api/categories/${categoryData._id}/changes/${changeId}`).send(changeUpdate)
  //   .end((err, res) => {
  //     const changeDiff =
  //     expect(res.body.currentMonthDetail.closingTotal).to.eq
  //   })
  // });
});
