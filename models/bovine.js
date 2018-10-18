const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const moment = require('moment');

/**
 * NOTE: Ids on palmiet are not always unique and not applied early on.
 *       Many new technoligies for tracking, chipping etc which will have.
 *       Use mongo objectId for now as unique identifier which can be changed later
 */

const weightsSchema = new mongoose.Schema({
  timing: { type: String, enum: ['birth', 'sale', 'other']},
  date: Number,
  weight: Number,
  unit: String
}, {timestamps: true});

// make sure the virtuals get added
weightsSchema.set('toObject', { virtuals: true });
weightsSchema.set('toJSON', { virtuals: true });

weightsSchema.virtual('formattedWeighDate')
  .get(function() {
    const momentObj = moment(this.createdAt);
    return moment(momentObj).format('DD/MM/YYYY');
  });

const bovineSchema = new mongoose.Schema({
  identifier: String,
  category: { type: String, enum: [ 'calf', 'weaner', 'ox', 'cow', 'bull', 'bull-calf', 'heifer' ] },
  birthDate: Number,
  purchaseDate: Number,
  breed: String,
  mother: { type: ObjectId, ref: 'Bovine' },
  herd: { type: ObjectId, ref: 'Herd', default: null },

  weights: [ weightsSchema ],

  //--- BREEDING DETAILS ---///
  // NOTE: need answer about what is NB for mating period to track etc to see what else should be tracked
  breeding: {
    status: { type: Boolean, default: false },

    // NOTE: this will need to be set to false when a calf is born
    isPregnant: { type: Boolean, default: false },
    calvingPeriod: String,
    production: [{ type: ObjectId, ref: 'Bovine' }]
  },

  //--- FATTENING DETAILS ---///
  fattening: {
    dateStarted: Number,
    status: { type: Boolean, default: false },
    // type: { type: String, enum: ['feedlot', 'grasslot'] },
    period: String

  },

  // When archived
  // NOTE: once transfered, what happens to this bovines archived status
  isArchived: {type: Boolean, default: false},
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

//--- VIRTUALS ---//
bovineSchema.virtual('formattedBirthDate')
  .get((function(){
    const momentObj = moment.unix(this.birthDate);
    return moment(momentObj).format('DD/MM/YYYY');
  }));

// bovineSchema.virtual('formattedSaleDate')
//   .get(formatDate(this.birthDate));

//--- METHODS ---//

bovineSchema.methods.addWeight = function(newWeightObj){
  this.weights.push(newWeightObj);
  return this.save();
};

// NOTE: might not be necessary to toggle if only setting to false at calf registration
bovineSchema.methods.togglePregnancy = function() {
  this.breeding.isPregnant = !this.breeding.isPregnant;
  return this.save();
};

bovineSchema.methods.setBreedingStatus = function() {
  this.breeding.status = true;
  this.save();
};

bovineSchema.methods.setFatteningStatus = function() {
  this.fattening.status = true;
  this.save();
};

// To add a newly registered calf to production array and set isPregnant to false
bovineSchema.methods.addNewCalf = function(newCalfId) {
  this.breeding.isPregnant = false;
  this.breeding.production.push(newCalfId);
  this.save();
};

//--- INTERNAL FUNCTIONS ---//
// function formatDate(unixDate){
//   const momentObj = moment.unix(unixDate);
//   return moment(momentObj).format('DD/MM/YYYY');
// }

module.exports = mongoose.model('Bovine', bovineSchema);
