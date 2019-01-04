import { Schema, model } from 'mongoose';
import Category from './category';
import modelDefaults from '../lib/defaults/models';

// eslint-disable-next-line prefer-destructuring
const cattleDefaultCategories = modelDefaults.cattleDefaultCategories;

const { ObjectId } = Schema.Types;

const CategoryNameSchema = new Schema({
  category: String,
  stockUnitFactor: Number,
  stockUnitType: String,
  inUse: Boolean
});

const FarmSchema = new Schema(
  {
    name: { type: String, required: true },
    farmOwner: { type: ObjectId, ref: 'user', required: true },
    categoryNames: [CategoryNameSchema]
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

/**
 *  A farm should control what categories it contains
 *  There should be a list of in play names and as a diff against the start list
 *  In time: Users should be able to define there own category names
 *           Won't do this now as it might cause people to create pseudo groups
 *
 */

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

FarmSchema.virtual('unUsedCategories').get(function() {
  if (!this.categoryNames) return null;
  const unUsedCategories = this.categoryNames.filter(categoryName => !categoryName.inUse);

  return unUsedCategories;
});

FarmSchema.pre('save', function(next) {
  if (this.isNew) {
    cattleDefaultCategories.forEach(defaultCategoryName => {
      this.categoryNames.push(defaultCategoryName);

      const newCategory = defaultCategoryName;
      newCategory.farm = this._id;

      Category.create(newCategory);
    });
  }

  next();
});

export default model('Farm', FarmSchema);
