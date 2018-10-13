const Herd = require('../models/herd');

function herdNew(req, res, next) {
  Herd
    .create(req.body)
    .then(herds => res.status(201).json(herds))
    .catch(next);
}

function herdShow(req, res, next ){
  Herd
    .findById( req.params.id )
    .populate( 'animals' )
    .then(herd => res.json(herd))
    .catch(next);
}

function herdIndex(req, res, next){
  Herd
    .find()
    .then(herds => res.json(herds))
    .catch(next);
}

function herdUpdate(req, res, next){
  Herd
    .findById(req.params.id)
    .then(herd => herd.set(req.body))
    .then(herd => herd.save())
    .then(herd => res.status(201).json(herd))
    .catch(next);
}

function herdDelete(req, res, next){
  Herd
    .findById(req.params.id)
    .then(herd => herd.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

//--- SUB-DOCUMENTS ---//
function herdAddAnimals(req, res, next){
  Herd
    .findById(req.params.herdId)
    .then(herd => herd.addAnimals(req.body))
    .then(herd => res.status(201).json(herd))
    .catch(next);
}

function herdRemoveAnimals( req, res, next ){
  Herd
    .findById(req.params.herdId)
    .then(herd => herd.removeAnimals(req.body))
    .then(herd => res.status(204).json(herd))
    .catch(next);
}

module.exports ={
  create: herdNew,
  show: herdShow,
  index: herdIndex,
  update: herdUpdate,
  delete: herdDelete,

  // Sub-Document
  addAnimals: herdAddAnimals,
  deleteAnimals: herdRemoveAnimals
};
