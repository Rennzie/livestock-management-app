const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

const herdSchema = new mongoose.Schema({
  name: String,
  category: {type: String, enum: ['cows', 'bull-calves', 'weaners', 'bulls', 'pasturelot', 'feedlot', 'grassland'] }
}, { timestamps: true });

// make sure the virtuals get added
herdSchema.set('toObject', { virtuals: true });
herdSchema.set('toJSON', { virtuals: true });

//--- HOOKS ---//

//--- VIRTUALS ---//
herdSchema.virtual('animals', {
  ref: 'Bovine',
  localField: '_id',
  foreignField: 'herd'
});
//
herdSchema.virtual('averageBirth')
  .get(function() {
    if(!this.animals) return null;

    let totalBirthDate = 0;
    this.animals.forEach(animal => totalBirthDate += animal.birthDate);
    return totalBirthDate/this.animals.length;
  });

herdSchema.virtual('averageWeight')
  .get(function() {
    if(!this.animals) return null;

    let totalWeight = 0;
    this.animals.forEach( animal => {
      const lastIndex = animal.weights.length - 1;
      if(!lastIndex) return;
      totalWeight += animal.weights[lastIndex].weight;
    });

    return Math.round( totalWeight / this.animals.length );
  });

herdSchema.virtual('totalAnimals')
  .get(function() {
    if(!this.animals) return null;

    return this.animals.length;
  });

herdSchema.virtual('totalPregnant')
  .get(function() {
    if(!this.animals) return null;
    if(this.category !== 'cows') return null;

    const pregnantCows = this.animals.filter(animal => animal.breeding.isPregnant);

    return pregnantCows.length;
  });

herdSchema.virtual('totalCalves')
  .get(function() {
    if(!this.animals) return null;
    if(this.animals.every(animal => animal.category === 'cow')) return null;

    const totalCalves = this.animals.filter(animal => animal.category === 'calf' || animal.category === 'bull-calf');

    return totalCalves.length;
  });

//--- METHODS ---//

module.exports = mongoose.model('Herd', herdSchema);

// NOTE: these methods are deprecated unless we need to change back to the old method of adding animals to herd.
// Accepts an array of ids and adds them into the animals array if they are not already there
// herdSchema.methods.addAnimals = function( animalIdsArr ){
//   for ( let i = 0; i < animalIdsArr.length; i++ ){
//     if ( this.animals.some( animal => animal._id.toString() === animalIdsArr[i] )){
//       continue;
//     }
//     this.animals.push( animalIdsArr[i] );
//   }
//   return this.save();
// };
//
// // Accepts an array of Ids and filters the animals by them
// herdSchema.methods.removeAnimals = function( animalIdsArr ){
//   const updatedAnimals = this.animals.filter( animal => !animalIdsArr.includes( animal._id.toString() ));
//   this.animals = updatedAnimals;
//   return this.save();
// };
