const express = require('express');

const Router = express.Router();

const classController = require('../../controllers/classController');

Router.route('/classes')
  .post(classController.create)
  .get(classController.index);

Router.route('/classes/:id').get(classController.show);

Router.route('/classes/:classId/changes').post(classController.createChange);

module.exports = Router;
