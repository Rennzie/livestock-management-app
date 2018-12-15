import express from 'express';
import multer from 'multer';
import bovineController from '../../controllers/bovineController';

const Router = express.Router();
const upload = multer({ dest: 'temp/csv' }); // saves uploaded files to destination

Router.route('/bovines')
  .post(bovineController.create)
  .get(bovineController.index);

Router.route('/bovines/:id')
  .get(bovineController.show)
  .delete(bovineController.delete)
  .put(bovineController.update);

// Updates & Changes
Router.route('/bovines/categories').patch(bovineController.updateCategory);

Router.route('/bovines/breeding').patch(bovineController.setBreedingStatus);

Router.route('/bovines/:id/breeding/pregtest').post(bovineController.updatePregTest);

Router.route('/bovines/:id/breeding/production').post(bovineController.updateProduction);

Router.route('/bovines/:id/archive').patch(bovineController.archive);

Router.route('/bovines/fattening').patch(bovineController.setFatteningStatus);

// Sub-Documents
Router.route('/bovines/:bovineId/weights').post(bovineController.addWeight);

Router.route('/bovines/weights').post(upload.single('file'), bovineController.addWeights);

export default Router;
