import { Schema, model } from 'mongoose';
import moment from 'moment';

const { ObjectId } = Schema.Types;

/**
 *  GOAL: Create a dynamic category model based on changes driven by the user
 *
 *  There should be no open uncontrolled objects (this is for when we port to graphql)
 *
 *  The basis of the model is the change
 *    The model should produce a running summary of the periods changes
 *    The monthly summary and the individual changes should be archived every month
 */

// === SUB-DOCUMENTS ===//
const ChangeTrackerSchema = new Schema({
  createdAt: Date,
  reasonForChange: { type: String, enum: ['add', 'purchase', 'death', 'theft', 'sale', 'other'] },
  animalsMoved: Number,
  notes: String
});

const ChangeArchiveSchema = new Schema({
  period: String,
  changes: [ChangeTrackerSchema]
});

const MonthlyChangeAccumulatorSchema = new Schema({
  name: String,
  total: Number
});
const MonthlyDetailSchema = new Schema({
  openingTotal: Number,
  closingTotal: Number,
  period: String,
  changes: [MonthlyChangeAccumulatorSchema]
});

// === DOCUMENT ===//
const CategorySchema = new Schema(
  {
    class: {
      type: String,
      enum: [
        'archive',
        'calves',
        'cows',
        'bull-calves',
        'oxen',
        'weaners',
        'bulls',
        'pasturelot',
        'feedlot',
        'grassland',
        'heifers-1-2',
        'heifers-2-3',
        'replacement-heifers'
      ]
    },
    farm: { type: ObjectId, ref: 'Farm', required: true },
    currentMonthDetail: {
      openingTotal: { type: Number, default: 0 },
      closingTotal: Number,
      period: { type: String, default: moment().format('MMM-YYYY') },
      changes: [MonthlyChangeAccumulatorSchema]
    },

    currentMonthChanges: [ChangeTrackerSchema],
    prevMonthsDetail: [MonthlyDetailSchema],
    prevMonthsChanges: [ChangeArchiveSchema]
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// --- HOOKS ---//
/**
 *  ARCHIVING EACH MONTH AND PRODUCING A SUMMARY CHANGE OBJECT
 *
 *  Before each save (every update/create or patch )
 *    Check the detail summary is for the current month.
 *    If not then archive it into prevMonthsDetail
 *    If month has not changed then recalculate the closing total and update the changes sumamry object
 *
 *  IDEA: this pre save could be run for month, week, day etc
 *
 *  EDGE: if a change is set retrospectively and the month has already changed
 *        then this will create problems with the current set up.
 *        A more robust solution would be to create change summary from the monthly detail archive??
 */
CategorySchema.pre('save', function(next) {
  // at first save of a new month, archive last month, set the period and the openingTotal
  const period = moment().format('MMM-YYYY');
  let currentMonthUpdate = null;

  if (this.currentMonthDetail.period !== period) {
    // archives the current month at first save of a new month
    const lastMonth = JSON.parse(JSON.stringify(this.currentMonthDetail));
    this.prevMonthsDetail.push(lastMonth);

    currentMonthUpdate = startNewMonth(lastMonth.closingTotal, period);
  } else {
    currentMonthUpdate = this.currentMonthDetail;
  }

  // updates the closing total and the change summary object
  currentMonthUpdate.closingTotal = getClosingTotal(
    this.currentMonthChanges,
    currentMonthUpdate.openingTotal
  );
  currentMonthUpdate.changes = aggregateMonthChanges(this.currentMonthChanges);

  this.currentMonthDetail = currentMonthUpdate;
  next();
});

// --- VIRTUALS ---//

// --- METHODS ---//

/**
 *  If the changePeriod is !== currentSavePeriod then it should be the next month
 *
 *  Then we need to archive the pervious months changes
 *  and add the new change to the monthly changes array before saving
 *
 *  Otherwise just add the newChange to the currentMonthChanges array
 */
CategorySchema.methods.newChange = function(newChange) {
  const lastMonth = moment()
    .subtract(1, 'month')
    .format('MMM-YYYY');
  const changePeriod = moment(newChange.createdAt).format('MMM-YYYY');
  // the period of the last saved monthlyDetail
  const currentSavedPeriod = this.currentMonthDetail.period;

  if (changePeriod !== currentSavedPeriod) {
    // Archive all the changes and start a new curreMonthChanges array
    const lastMonthsChanges = {};
    lastMonthsChanges.period = lastMonth;
    lastMonthsChanges.changes = [...this.currentMonthChanges];
    this.prevMonthsChanges.push(lastMonthsChanges);

    // make a fresh currentMonthChanges
    this.currentMonthChanges = [];
    this.currentMonthChanges.push(newChange);

    return this.save();
  }

  this.currentMonthChanges.push(newChange);

  return this.save();
};

export default model('Class', CategorySchema);

//  === INTERNAL FUNCTION ===//
function startNewMonth(lastMonthClosing, period) {
  const newMonth = {};

  // sets the period of the new month and passes on the closing total of last month
  newMonth.period = period;
  newMonth.openingTotal = lastMonthClosing;

  return newMonth;
}

// calculates the closing total
function getClosingTotal(monthsChanges, openingTotal) {
  let closingTotal = openingTotal;

  for (let i = 0; i < monthsChanges.length; i += 1) {
    closingTotal += monthsChanges[i].animalsMoved;
  }
  return closingTotal;
}

// NOTE: WE CAN DO THIS UPON ADDING A CHANGE TO DECREASE THE AMOUNT OF WORK
// creates the summary object for the months changes
function aggregateMonthChanges(changes) {
  const updatedChangesObj = {};

  // check the array for any items with name that matchs changes.reasonForChange
  //    If they do then add the number to the total
  //    If not then create a new object with name set to changes.reasonForChange and total set to changes.animalsMoved

  // accumulate the different changes for the month

  /**
   *  Goal: produce a currentMonthDetail.changes array with uniquely names objects
   *    iterate over all the changes for teh month and create an object with accumulated animal changes
   *    iterate over that object and create a new object with each entry in the monthlyChangeAccumulatorSchema format
   */
  changes.forEach(change => {
    if (!updatedChangesObj[change.reasonForChange]) {
      updatedChangesObj[change.reasonForChange] = change.animalsMoved;
    } else {
      updatedChangesObj[change.reasonForChange] += change.animalsMoved;
    }
  });

  const updatedChangesArray = Object.entries(updatedChangesObj).map(([key, value]) => ({
    name: key,
    total: value
  }));

  return updatedChangesArray;
}
