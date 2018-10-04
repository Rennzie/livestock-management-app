const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const animalSchema = new mongoose.Schema({
  type: {type: String, enum: ['cow', 'sheep']},
  dateOfBirth: Number,
  dateOfPurchase: Number,

  weights: [{ weight: Number, unit: String },{timestamps: true}],
  owners: [{ type: ObjectId, ref: 'User' }],

  // When archived
  isArchived: {type: Boolean, default: false}, // NOTE: once transfered what happens to this animals archied status
  methodOfRemoval: {type: String, enum: ['sale', 'death', 'theft']},
  dateOfRemovel: Number,
  causeOfDeath: String,

  saleRevenue: Number,
  revenueCurrency: String,
  saleWeight: Number,
  weightUnit: String

}, {timestamps: true});




//--- METHODS ---//

animalSchema.methods.addWeight = function(newWeightObj){
  this.weights.push(newWeightObj);
  return this.save();
};

module.exports = mongoose.model('Animal', animalSchema);
