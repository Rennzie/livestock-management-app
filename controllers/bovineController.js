const Bovine = require('../models/bovine');
const csv = require('fast-csv');
const fs = require('fs');

function  bovineCreate( req, res, next ){
  Bovine
    .create(req.body)
    .then(bovine => res.status(201).json(bovine)) // 201 created
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

//--- SUB-DOCUMENTS ---//
function  bovineWeightAdd( req, res, next ){
  Bovine
    .findById(req.params. bovineId)
    .then(bovine => bovine.addWeight(req.body))
    .then(bovine => res.status(201).json(bovine))
    .catch(next);
}

function  bovineWeightsBatchUpload( req, res, next ){
  const csvOptions = {headers: ['_id', 'weight', 'unit'], renameHeaders: true, ignoreEmpty: true};
  const fileRows = [];

  csv.fromPath(req.file.path, csvOptions)
    .on('data', data => {
      fileRows.push(data); //push each row into fileRows as JSON object
    })
    .on('end', () => {
      fs.unlinkSync(req.file.path);   // remove temp file
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
          // BUG: runs this return before the forEach has completed
          return Bovine.find();
        })
        .then(bovines => res.status(201).json(bovines))
        .catch(next);
    // NOTE: need to now update each weight now that youve found only the ones needing updating
    });
}

module.exports = {
  create: bovineCreate,
  show: bovineShow,
  index: bovineIndex,
  delete: bovineDelete,
  update: bovineEdit,

  //sub-documents
  addWeight: bovineWeightAdd,
  addWeights: bovineWeightsBatchUpload
};
