const Herd = require('../models/herd');
const Bovine = require('../models/bovine');

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
    .populate( 'animals' )
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
function herdChangeNew(req, res, next){
  Bovine
    .findById( req.params.herdId )
    .then(herd => herd.newChange(req.body))
    .then(herd => res.status(201).json(herd))
    .catch(next);

}

module.exports ={
  create: herdNew,
  show: herdShow,
  index: herdIndex,
  update: herdUpdate,
  delete: herdDelete,

  // Sub-Document
  newChange: herdChangeNew
};
