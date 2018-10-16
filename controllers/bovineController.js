const Bovine = require('../models/bovine');
const csv = require('fast-csv');
const fs = require('fs');

function  bovineCreate( req, res, next ){
  Bovine
    .create(req.body)

    // 201 created
    .then(bovine => res.status(201).json(bovine))
    .catch(next);
}

function  bovineShow( req, res, next ){
  Bovine
    .findById( req.params.id )
    .then(bovine => res.json(bovine))
    .catch(next);
}

function  bovineIndex( req, res, next ){
  Bovine
    .find()
    .then(bovines => res.json(bovines))
    .catch(next);
}

function  bovineDelete( req, res, next ){
  Bovine
    .findById(req.params.id)
    .then(bovine => bovine.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function  bovineEdit( req, res, next){
  Bovine
    .findById(req.params.id)
    .then(bovine => bovine.set(req.body))
    .then(bovine => bovine.save())
    .then(bovine => res.status(201).json(bovine))
    .catch(next);
}

//--- UPDATE & CHANGES ---//
function bovineCategoryUpdate( req, res, next ){
  Bovine
    .update(
      {_id: {$in: req.body.ids}},
      { category: req.body.newCategory },
      {multi: true})
    .then(() => Bovine.find({_id: {$in: req.body.ids}}))
    .then(bovines => res.status(201).json(bovines))
    .catch(next);
}

function bovineTogglePregnancy( req, res, next ){
  Bovine
    .find({_id: {$in: req.body}})
    .then(bovines => bovines.forEach(bovine => bovine.togglePregnancy()))
    .then(() => res.sendStatus(201))
    .catch(next);
}

function bovineBreedingTrue( req, res, next ){
  Bovine
    .find({_id: {$in: req.body}})
    .then(bovines => bovines.forEach(bovine => bovine.setBreedingStatus()))
    .then(() => res.sendStatus(201))
    .then(next);
}

function bovineFattengingTrue( req, res, next ){
  Bovine
    .find({_id: {$in: req.body}})
    .then(bovines => bovines.forEach(bovine => bovine.setFatteningStatus()))
    .then(() => res.sendStatus(201))
    .then(next);
}

function updateProduction( req, res, next ) {
  Bovine
    .findById(req.params.id)
    .then(bovine =>{
      console.log('FIRED FROM THE BOVINE CONTROLLER!!!', req.body);
      bovine.addNewCalf(req.body.calfId);
    })
    .then(() => res.sendStatus(201))
    .catch(next);
}


//--- SUB-DOCUMENTS ---//
function  bovineWeightAdd( req, res, next ){
  Bovine
    .findById(req.params.bovineId)
    .then(bovine => bovine.addWeight(req.body))
    .then(bovine => res.status(201).json(bovine))
    .catch(next);
}

function  bovineWeightsBatchUpload( req, res, next ){
  const csvOptions = {headers: ['_id', 'weight', 'unit'], renameHeaders: true, ignoreEmpty: true};
  const fileRows = [];
  csv.fromPath(req.file.path, csvOptions)
    .on('data', data => {

      //push each row into fileRows as JSON object
      fileRows.push(data);
    })
    .on('end', () => {

      // remove temp file
      fs.unlinkSync(req.file.path);
      const ids = fileRows.map(item => item._id);
      Bovine
        .find({'_id': {$in: ids}})
        .then(bovines => {
          bovines.forEach(bovine => {
            const newWeight = fileRows.filter(weights => bovine._id.toString() === weights._id)[0];
            const weightOnly = {
              timing: newWeight.timing,
              weight: newWeight.weight,
              unit: newWeight.unit
            };
            bovine.addWeight(weightOnly);
          });
        })
        // BUG: runs this return before the forEach has completed
        // .then(() => Bovine.find({'_id': {$in: ids}}))
        .then(() => res.sendStatus(201))
        .catch(next);
    });
}

module.exports = {
  create: bovineCreate,
  show: bovineShow,
  index: bovineIndex,
  delete: bovineDelete,
  update: bovineEdit,

  //updates and changes
  updateCategory: bovineCategoryUpdate,
  togglePregnancy: bovineTogglePregnancy,
  setBreedingStatus: bovineBreedingTrue,
  setFatteningStatus: bovineFattengingTrue,
  updateProduction: updateProduction,

  //sub-documents
  addWeight: bovineWeightAdd,
  addWeights: bovineWeightsBatchUpload
};
