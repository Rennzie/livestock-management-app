import express from 'express';

import categoryController from '../../controllers/categoryController';

const Router = express.Router();

Router.route('/categories')
  .post(categoryController.create)
  .get(categoryController.index);

Router.route('/categories/:id')
  .get(categoryController.show)
  .put(categoryController.edit)
  .delete(categoryController.delete);

Router.route('/categories/:categoryId/changes').post(categoryController.createChange);

Router.route('/categories/:categoryId/changes/:changeId')
  .get(categoryController.showChange)
  .put(categoryController.editChange)
  .delete(categoryController.deleteChange);

export default Router;
