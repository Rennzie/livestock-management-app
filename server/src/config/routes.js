import express from 'express';

// controllers
import authController from '../controllers/authController';
import userController from '../controllers/userController';

// end points
import bovines from './endpoints/bovines';
import classes from './endpoints/classes';
import farms from './endpoints/farms';

const Router = express.Router();

// --- Auth Routes ---//
Router.route('/register').post(authController.register);

Router.route('/login').post(authController.login);

// --- User Model Routes ---//
Router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

Router.route('/users').get(userController.index);

// --- End Points ---//
Router.use(bovines);
Router.use(classes);
Router.use(farms);

export default Router;
