const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const bovineSchema = new mongoose.Schema({
  category: { type: String, enum: [ 'calf', 'weaner', 'ox', 'cow', 'bull', 'heifer' ] },
  dateOfBirth: Number,
  dateOfPurchase: Number,
  breed: String,

  weights: [{
    timing: { type: String, enum: ['birth', 'sale', 'other']},
    weight: Number,
    unit: String
  }],

  //--- BREEDING DETAILS ---///
  breeding: {
    status: Boolean,
    currentlyPregnant: Boolean, // NOTE: this will need to be set to false when a calf is born
    calvingPeriod: String,
    production: [{
      dateOfCalving: Number,
      offSpring: { type: ObjectId, ref: 'Bovine'}
      // NOTE: need answer about what is NB for mating period to track etc to see what else should be tracked
    }]

  },

  fattening: {
    status: { type: Boolean, default: false },
    period: String

  },

  // When archived
  isArchived: {type: Boolean, default: false}, // NOTE: once transfered what happens to this bovines archied status
  methodOfRemoval: {type: String, enum: ['sale', 'death', 'theft']},
  dateOfRemovel: Number,
  causeOfDeath: String,

  sale: {
    saleRevenue: Number,
    revenueCurrency: String,
    dateOfSale: Number
  },

  owners: [{ type: ObjectId, ref: 'User' }]

}, {timestamps: true});




//--- METHODS ---//

bovineSchema.methods.addWeight = function(newWeightObj){
  this.weights.push(newWeightObj);
  return this.save();
};

module.exports = mongoose.model('Animal', bovineSchema);
