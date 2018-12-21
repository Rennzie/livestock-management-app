import express from 'express';

// controllers
import authController from '../controllers/authController';
import userController from '../controllers/userController';

// end points
import bovines from './endpoints/bovines';
import categories from './endpoints/categories';
import farms from './endpoints/farms';
import auth from './endpoints/auth.router';

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
Router.use(categories);
Router.use(farms);
Router.use(auth);

export default Router;
