import Farm from '../models/farm';

function newFarm(req, res, next) {
  Farm.create(req.body)
    .then(farm => res.status(201).json(farm))
    .catch(next);
}

function showFarm(req, res, next) {
  Farm.findById(req.params.id)
    .populate('categories')
    .then(farm => res.json(farm))
    .catch(next);
}

export default {
  create: newFarm,
  show: showFarm
};
