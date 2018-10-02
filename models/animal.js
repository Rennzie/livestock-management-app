const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const animalSchema = new mongoose.Schema({

  dateOfBirth: Number,
  dateOfPurchase: Number,
  weights: [{ weight: Number, unit: String }],
  dateOfRemovel: Number,
  methodOfRemoval: {type: String, enum: ['sale', 'death', 'theft']},
  saleRevenue: Number,
  revenueCurrency: String,
  causeOfDeath: String,
  owners: [{ type: ObjectId, ref: 'User' }],
  saleWeight: Number,
  weightUnit: String

});

module.exports = mongoose.model('Animal', animalSchema);
