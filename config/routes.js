const express = require('express');
const Router = express.Router();

// Controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const animalController = require('../controllers/animalController');

//--- Auth Routes ---//
Router.route('/register')
  .post(authController.register);


//--- User Model Routes ---//
Router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

//--- Animal Model Routes ---//
Router.route('/animals')
  .post(animalController.create)
  .get(animalController.index);

Router.route('/animals/:id')
  .get(animalController.show)
  .delete(animalController.delete)
  .put(animalController.update);

Router.route('/animals/:animalId/weights')
  .post(animalController.addWeight);

module.exports = Router;
