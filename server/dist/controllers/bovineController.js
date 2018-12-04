"use strict";var csv=require("fast-csv"),fs=require("fs"),Bovine=require("../models/bovine");function bovineCreate(a,b,c){Bovine.create(a.body)// 201 created
.then(function(a){return b.status(201).json(a)}).catch(c)}function bovineShow(a,b,c){Bovine.findById(a.params.id).then(function(a){return b.json(a)}).catch(c)}function bovineIndex(a,b,c){Bovine.find().then(function(a){return b.json(a)}).catch(c)}function bovineDelete(a,b,c){Bovine.findById(a.params.id).then(function(a){return a.remove()}).then(function(){return b.sendStatus(204)}).catch(c)}function bovineEdit(a,b,c){Bovine.findById(a.params.id).then(function(b){return b.set(a.body)}).then(function(a){return a.save()}).then(function(a){return b.status(201).json(a)}).catch(c)}// --- UPDATE & CHANGES ---//
function bovineCategoryUpdate(a,b,c){Bovine.update({_id:{$in:a.body.ids}},{category:a.body.newCategory},{multi:!0}).then(function(){return Bovine.find({_id:{$in:a.body.ids}})}).then(function(a){return b.status(201).json(a)}).catch(c)}// to set the status of a cow to pregnant or notInCalf to true
function bovinePregTest(a,b,c){Bovine.findById(a.params.id).then(function(b){return b.addPregTest(a.body)}).then(function(){return b.sendStatus(201)}).catch(c)}function bovineBreedingTrue(a,b,c){Bovine.find({_id:{$in:a.body}}).then(function(a){return a.forEach(function(a){return a.setBreedingStatus()})}).then(function(){return b.sendStatus(201)}).then(c)}function bovineFattengingTrue(a,b,c){Bovine.find({_id:{$in:a.body}}).then(function(a){return a.forEach(function(a){return a.setFatteningStatus()})}).then(function(){return b.sendStatus(201)}).then(c)}function updateProduction(a,b,c){Bovine.findById(a.params.id).then(function(b){b.addNewCalf(a.body.calfId)}).then(function(){return b.sendStatus(201)}).catch(c)}// --- SUB-DOCUMENTS ---//
function bovineWeightAdd(a,b,c){Bovine.findById(a.params.bovineId).then(function(b){return b.addWeight(a.body)}).then(function(a){return b.status(201).json(a)}).catch(c)}function bovineArchive(a,b,c){Bovine.findById(a.params.id).then(function(b){return b.set(a.body)}).then(function(a){return a.save()}).then(function(){return b.sendStatus(201)}).catch(c)}function bovineWeightsBatchUpload(a,b,c){var d=[];csv.fromPath(a.file.path,{headers:["_id","weight","unit"],renameHeaders:!0,ignoreEmpty:!0}).on("data",function(a){// push each row into fileRows as JSON object
d.push(a)}).on("end",function(){fs.unlinkSync(a.file.path);var e=d.map(function(a){return a._id});Bovine.find({_id:{$in:e}}).then(function(a){a.forEach(function(a){var b=d.filter(function(b){return a._id.toString()===b._id})[0],c={timing:b.timing,weight:b.weight,unit:b.unit};a.addWeight(c)})})// BUG: runs this return before the forEach has completed
// .then(() => Bovine.find({'_id': {$in: ids}}))
.then(function(){return b.sendStatus(201)}).catch(c)})}module.exports={create:bovineCreate,show:bovineShow,index:bovineIndex,delete:bovineDelete,update:bovineEdit,// updates and changes
updateCategory:bovineCategoryUpdate,setBreedingStatus:bovineBreedingTrue,setFatteningStatus:bovineFattengingTrue,updatePregTest:bovinePregTest,updateProduction:updateProduction,archive:bovineArchive,// sub-documents
addWeight:bovineWeightAdd,addWeights:bovineWeightsBatchUpload};