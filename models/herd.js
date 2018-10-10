const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const herdSchema = new mongoose.Schema({
  name: String,
  animals: [{type: ObjectId, ref: 'Bovine'}],
  category: {type: String, enum: ['breeding', 'yearlings', 'bulls', 'fattening'] }
});

// make sure the virtuals get added
herdSchema.set('toObject', { virtuals: true });
herdSchema.set('toJSON', { virtuals: true });

//--- METHODS ---//

// Accepts an array of ids and adds them into the animals array
herdSchema.methods.addAnimal = function(animalIdsArr){
  animalIdsArr.forEach(animal => this.animals.push(animal));
  return this.save();
};

// Accepts an array of Ids and filters the animals by them
herdSchema.methods.removeAnimal = function(animalIdsArr){
  const updatedAnimals = this.animals.filter(animal => animalIdsArr.includes(animal._id));
  this.animals = updatedAnimals;
  return this.save();
};

module.exports = mongoose.model('Herd', herdSchema);
