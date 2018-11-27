const express = require('express');
const Router = express.Router();

// controllers
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');

// end points
const bovines = require('./endpoints/bovines.js');
const classes = require('./endpoints/classes.js');

//--- Auth Routes ---//
Router.route('/register')
  .post(authController.register);

//--- User Model Routes ---//
Router.route('/users/:id')
  .get(userController.show)
  .put(userController.update)
  .delete(userController.delete);

//--- End Points ---//
Router.use(bovines);
Router.use(classes);

module.exports = Router;
