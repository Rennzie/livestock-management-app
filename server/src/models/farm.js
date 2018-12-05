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
  ref: 'Class',
  localField: '_id',
  foreignField: 'farm'
});

export default model('Farm', FarmSchema);
