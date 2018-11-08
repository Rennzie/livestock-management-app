const express = require('express');
const Router = express.Router();

const herdController = require('../../controllers/herdController');

Router.route('/herds')
  .post(herdController.create)
  .get(herdController.index);

Router.route('/herds/:id')
  .get(herdController.show)
  .put(herdController.update)
  .delete(herdController.delete);

Router.route('/herds/:herdId/changes')
  .post(herdController.newChange);

module.exports = Router;
