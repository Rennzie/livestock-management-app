const Animal = require('../models/animal');

function animalCreate( req, res, next ){
  Animal
    .create(req.body)
    .then(animal => res.json(animal))
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


module.exports = {
  create: animalCreate,
  show: animalShow,
  index: animalIndex
};
