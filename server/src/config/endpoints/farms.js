import express from 'express';
import farmController from '../../controllers/farmController';

const Router = express.Router();

Router.route('/farms').post(farmController.create);

Router.route('/farms/:id').get(farmController.show);

Router.route('/users/:userId/farms').get(farmController.index);

export default Router;
