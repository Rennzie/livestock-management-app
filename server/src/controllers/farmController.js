import Farm from '../models/farm';

function farmNew(req, res, next) {
  Farm.create(req.body)
    .then(farm => res.status(201).json(farm))
    .catch(next);
}

function farmIndex(req, res, next) {
  Farm.find({ _id: req.params.userId })
    .then(farms => res.json(farms))
    .catch(next);
}

function farmShow(req, res, next) {
  Farm.findById(req.params.id)
    .populate('categories')
    .then(farm => res.json(farm))
    .catch(next);
}

export default {
  create: farmNew,
  show: farmShow,
  index: farmIndex
};
