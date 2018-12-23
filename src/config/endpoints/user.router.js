import express from 'express';

// controllers
import userController from '../../controllers/userController';

const Router = express.Router();

Router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

Router.route('/users').get(userController.index);

export default Router;
