const Herd = require('../models/herd');

function herdNew(req, res, next) {
  Herd
    .create(req.body)
    .then(herds => res.status(201).json(herds))
    .catch(next);
}

function herdShow(req, res, next ){
  Herd
    .findById(req.params.id)
    .then(herd => res.json(herd))
    .catch(next);
}

function herdIndex(req, res, next){
  Herd
    .find()
    .then(herds => res.json(herds))
    .catch(next);
}

module.exports ={
  create: herdNew,
  show: herdShow,
  index: herdIndex
};
