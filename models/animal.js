const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const animalSchema = new mongoose.Schema({
  type: {type: String, enum: ['cow', 'sheep']},
  dateOfBirth: Number,
  dateOfPurchase: Number,
  weights: [{ weight: Number, unit: String },{timestamps: true}],
  dateOfRemovel: Number,
  methodOfRemoval: {type: String, enum: ['sale', 'death', 'theft']},
  saleRevenue: Number,
  revenueCurrency: String,
  causeOfDeath: String,
  owners: [{ type: ObjectId, ref: 'User' }],
  saleWeight: Number,
  weightUnit: String

}, {timestamps: true});




//--- METHODS ---//

animalSchema.methods.addWeight = function(newWeightObj){
  this.weights.push(newWeightObj);
  return this.save();
};

module.exports = mongoose.model('Animal', animalSchema);