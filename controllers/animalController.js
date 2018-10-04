const Animal = require('../models/animal');

function animalCreate( req, res, next ){
  Animal
    .create(req.body)
    .then(animal => res.status(201).json(animal)) // 201 created
    .catch(next);
}

function animalShow( req, res, next ){
  Animal
    .findById( req.params.id )
    .then(animal => res.json(animal))
    .catch(next);
}

function animalIndex( req, res, next ){
  Animal
    .find()
    .then(animals => res.json(animals))
    .catch(next);
}

function animalDelete( req, res, next ){
  Animal
    .findById(req.params.id)
    .then(animal => animal.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function animalEdit( req, res, next){
  Animal
    .findById(req.params.id)
    .then(animal => animal.set(req.body))
    .then(animal => animal.save())
    .then(animal => res.status(201).json(animal))
    .catch(next);
}

//--- SUB-DOCUMENTS ---//
function animalWeightAdd( req, res, next ){
  Animal
    .findById(req.params.animalId)
    .then(animal => animal.addWeight(req.body))
    .then(animal => res.status(201).json(animal))
    .catch(next);
}

module.exports = {
  create: animalCreate,
  show: animalShow,
  index: animalIndex,
  delete: animalDelete,
  update: animalEdit,

  //sub-documents
  addWeight: animalWeightAdd
};
