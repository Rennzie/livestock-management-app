import express from 'express';

// controllers
import authController from '../controllers/authController';

// end points
import bovineRouter from './endpoints/bovines.router';
import categoryRouter from './endpoints/categories.router';
import farmRouter from './endpoints/farms.router';
import userRouter from './endpoints/user.router';

const Router = express.Router();

// --- Auth Routes ---//
Router.route('/register').post(authController.register);

Router.route('/login').post(authController.login);

// --- End Point Routers ---//
Router.use(bovineRouter);
Router.use(categoryRouter);
Router.use(farmRouter);
Router.use(userRouter);

export default Router;
