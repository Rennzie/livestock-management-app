const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

/**
 * NOTE: Ids on palmiet are not always unique and not applied early on.
 *       Many new technoligies for tracking, chipping etc which will have.
 *       Use mongo objectId for now as unique identifier which can be changed later
 */

const bovineSchema = new mongoose.Schema({
  category: { type: String, enum: [ 'calf', 'weaner', 'ox', 'cow', 'bull', 'heifer' ] },
  birthDate: Number,
  purchaseDate: Number,
  breed: String,

  weights: [{
    timing: { type: String, enum: ['birth', 'sale', 'other']},
    weight: Number,
    unit: String
  }],

  //--- BREEDING DETAILS ---///
  breeding: {
    status: { type: Boolean, default: false },
    isPregnant: { type: Boolean, default: false }, // NOTE: this will need to be set to false when a calf is born
    calvingPeriod: String,
    production: [{
      dateOfCalving: Number,
      offSpring: { type: ObjectId, ref: 'Bovine'}
      // NOTE: need answer about what is NB for mating period to track etc to see what else should be tracked
    }]

  },

  //--- FATTENING DETAILS ---///
  fattening: {
    dateStarted: Number,
    status: { type: Boolean, default: false },
    type: { type: String, enum: ['feedlot', 'grasslot'] },
    period: String

  },

  // When archived
  isArchived: {type: Boolean, default: false}, // NOTE: once transfered what happens to this bovines archied status
  methodOfRemoval: {type: String, enum: ['sale', 'death', 'theft']},
  removalDate: Number,
  causeOfDeath: String,

  sale: {
    saleRevenue: Number,
    revenueCurrency: String,
    saleDate: Number
  }

  // owners: [{ type: ObjectId, ref: 'User' }]

}, {timestamps: true});

// make sure the virtuals get added
bovineSchema.set('toObject', { virtuals: true });
bovineSchema.set('toJSON', { virtuals: true });




//--- METHODS ---//

bovineSchema.methods.addWeight = function(newWeightObj){
  this.weights.push(newWeightObj);
  return this.save();
};

bovineSchema.methods.togglePregnancy = function(){
  this.breeding.isPregnant = !this.breeding.isPregnant;
  return this.save();
};

bovineSchema.methods.setBreedingStatus = function(){
  this.breeding.status = true;
  this.save();
};

bovineSchema.methods.setFatteningStatus = function(){
  this.fattening.status = true;
  this.save();
};

module.exports = mongoose.model('Animal', bovineSchema);
