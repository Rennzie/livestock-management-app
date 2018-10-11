const express = require('express');
const Router = express.Router();

const multer = require('multer');
const upload = multer({dest: 'temp/csv'}); //saves uploaded files to destination

const bovineController = require('../../controllers/bovineController');

Router.route('/bovines')
  .post(bovineController.create)
  .get(bovineController.index);

Router.route('/bovines/:id')
  .get(bovineController.show)
  .delete(bovineController.delete)
  .put(bovineController.update);

// Updates & Changes
Router.route('/bovines/categories')
  .patch(bovineController.updateCategory);

Router.route('/bovines/pregnant')
  .patch(bovineController.togglePregnancy);

Router.route('/bovines/breeding')
  .patch(bovineController.setBreedingStatus);

Router.route('/bovines/fattening')
  .patch(bovineController.setFatteningStatus);

// Sub-Documents
Router.route('/bovines/:bovineId/weights')
  .post(bovineController.addWeight);

Router.route('/bovines/weights')
  .post(upload.single('file'), bovineController.addWeights);

module.exports = Router;
