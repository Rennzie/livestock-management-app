const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const herdSchema = new mongoose.Schema({
  name: String,
  animals: [{type: ObjectId, ref: 'Bovine'}],
  category: {type: String, enum: ['cows', 'bull-calves', 'weaners', 'bulls', 'pasturelot', 'feedlot', 'grassland'] }
}, { timestamps: true });

// make sure the virtuals get added
herdSchema.set('toObject', { virtuals: true });
herdSchema.set('toJSON', { virtuals: true });

// herdSchema.virtual('averageBirth')
//   .get(function() {
//     return this.animals;
//
//   });

herdSchema.virtual('animals2', {
  ref: 'Bovine',
  localField: 'id',
  foreignField: 'herd'
});

//--- METHODS ---//
// Accepts an array of ids and adds them into the animals array if they are not already there
herdSchema.methods.addAnimals = function( animalIdsArr ){
  for ( let i = 0; i < animalIdsArr.length; i++ ){
    if ( this.animals.some( animal => animal._id.toString() === animalIdsArr[i] )){
      continue;
    }
    this.animals.push( animalIdsArr[i] );
  }
  return this.save();
};

// Accepts an array of Ids and filters the animals by them
herdSchema.methods.removeAnimals = function( animalIdsArr ){
  const updatedAnimals = this.animals.filter( animal => !animalIdsArr.includes( animal._id.toString() ));
  this.animals = updatedAnimals;
  return this.save();
};

module.exports = mongoose.model('Herd', herdSchema);
