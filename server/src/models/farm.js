import { Schema, model } from 'mongoose';

const { ObjectId } = Schema.Types;

const FarmSchema = new Schema(
  {
    name: { type: String, required: true },
    farmOwner: { type: ObjectId, ref: 'user', required: true }
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// --- VIRTUALS ---//
FarmSchema.virtual('categories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'farm'
});

FarmSchema.virtual('totalAnimals').get(function() {
  if (!this.categories) return null;

  let totalAnimals = 0;
  this.categories.forEach(category => {
    totalAnimals += category.currentMonthDetail.closingTotal;
  });

  return totalAnimals;
});

export default model('Farm', FarmSchema);
