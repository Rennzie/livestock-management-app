const mongoose = require('mongoose');
// const ObjectId = mongoose.Schema.Types.ObjectId;

/*/
 *  - Herd should track the number of animals in it on a monthly basis
 *  - Be able to add or remove an animal to the total
 *  - Track what the reasons for animal movements was.
 *  - Maintain this total for each month
 *  - Be able to reconcile for the whole year
 *  - Be able to archive the whole herd when all animals are removed, sold etc
 *  -
 *  -
 *  -
/*/

const herdChangesSchema = new mongoose.Schema({

  // this will be a moment date.
  createdAt: Date,
  reasonForChange: { type: String, enum: [ 'death', 'theft', 'sale', 'classChange']},
  animalsMoved: Number,
  notes: String
});

const herdEventSchema = new mongoose.Schema({
  createdAt: Date,
  activity: { type: String, enum: [ 'pregTest', 'weighHerd', 'innoculateHerd'] },
  weights: [ Number ]
});

const herdSchema = new mongoose.Schema({
  name: String,
  class: {
    type: String,
    enum: ['archive', 'cows', 'bull-calves', 'weaners', 'bulls', 'pasturelot', 'feedlot', 'grassland', 'replacement-heifers']
  },
  changes: [ herdChangesSchema ],
  events: [ herdEventSchema ]
}, { timestamps: true });

// make sure the virtuals get added
herdSchema.set('toObject', { virtuals: true });
herdSchema.set('toJSON', { virtuals: true });

//--- HOOKS ---//

//--- VIRTUALS ---//

herdSchema.virtual('totalAnimals')
  .get(function() {
    return this.changes.reduce( ( accum, item ) => {
      return accum += item.animalsMoved;
    }, 0);
  });







// herdSchema.virtual('animals', {
//   ref: 'Bovine',
//   localField: '_id',
//   foreignField: 'herd'
// });

// herdSchema.virtual('averageWeight')
//   .get(function() {
//     if(!this.animals) return null;
//
//     let totalWeight = 0;
//     this.animals.forEach( animal => {
//       const lastIndex = animal.weights.length - 1;
//       if(!lastIndex) return;
//       totalWeight += animal.weights[lastIndex].weight;
//     });
//
//     return Math.round( totalWeight / this.animals.length );
//   });

// herdSchema.virtual('totalAnimals')
//   .get(function() {
//     if(!this.animals) return null;
//
//     return this.animals.length;
//   });
//
// herdSchema.virtual('totalPregnant')
//   .get(function() {
//     if(!this.animals) return null;
//     if(this.class !== 'cows') return null;
//
//     const pregnantCows = this.animals.filter(animal => animal.breeding.isPregnant);
//
//     return pregnantCows.length;
//   });
//
// herdSchema.virtual('totalCalves')
//   .get(function() {
//     if(!this.animals) return null;
//     if(this.animals.every(animal => animal.class === 'cow')) return null;
//
//     const totalCalves = this.animals.filter(animal => animal.class === 'calf' || animal.class === 'bull-calf');
//
//     return totalCalves.length;
//   });

//--- METHODS ---//

herdSchema.methods.newChange = function( changeObj ) {
  this.changes.push(changeObj);
  return this.save();
};

module.exports = mongoose.model('Herd', herdSchema);
