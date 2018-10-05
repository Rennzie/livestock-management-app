const Animal = require('../models/animal');
const csv = require('fast-csv');
const fs = require('fs');

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

function animalWeightsBatchUpload( req, res, next ){
  console.log('the file path is====> ', req.file.path);
  const fileRows = [];
  csv.fromPath(req.file.path, {headers: true, ignoreEmpty: true})
    .on('data', data => {
      fileRows.push(data); //push each row into fileRows as JSON object
      // console.log('the data should be', data);
    })
    .on('end', () => {
      console.log('the converted CSV rows are ======> ', fileRows);
      fs.unlinkSync(req.file.path);
    })
    .then(() => res.json(fileRows)) //remove tmp files
    .catch(next);
}

module.exports = {
  create: animalCreate,
  show: animalShow,
  index: animalIndex,
  delete: animalDelete,
  update: animalEdit,

  //sub-documents
  addWeight: animalWeightAdd,
  addWeights: animalWeightsBatchUpload
};
