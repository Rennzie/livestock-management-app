import express from 'express';

import categoryController from '../../controllers/classController';

const Router = express.Router();

Router.route('/classes')
  .post(categoryController.create)
  .get(categoryController.index);

Router.route('/classes/:id').get(categoryController.show);

Router.route('/classes/:classId/changes').post(categoryController.createChange);

export default Router;
