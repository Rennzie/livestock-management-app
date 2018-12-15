import express from 'express';

import categoryController from '../../controllers/categoryController';

const Router = express.Router();

Router.route('/categories')
  .post(categoryController.create)
  .get(categoryController.index);

Router.route('/categories/:id').get(categoryController.show);

Router.route('/categories/:classId/changes').post(categoryController.createChange);

export default Router;
