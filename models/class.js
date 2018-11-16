const mongoose = require('mongoose');
const moment = require('moment');
// const ObjectId = mongoose.Schema.Types.ObjectId;

//=== SUB-DOCUMENTS ===//
const ChangeTrackerSchema = new mongoose.Schema({

  // this will be a moment date.
  createdAt: Date,
  reasonForChange: { type: String, enum: [ 'add', 'death', 'theft', 'sale']},
  animalsMoved: Number,
  notes: String
});

//=== DOCUMENTS ===//
const ClassSchema = new mongoose.Schema({
  name: String,
  class: {
    type: String,
    enum: ['archive', 'cows', 'bull-calves', 'weaners', 'bulls', 'pasturelot', 'feedlot', 'grassland', 'replacement-heifers']
  },
  currentMonthDetail: {
    openingTotal: { type: Number, default: 0 },
    closingTotal: Number,
    period: { type: String, default: moment().format('MMM-YYYY') },
    changes: { type: Object, default: {} }
  },
  monthlyDetailArchive: { type: Object, default: {} },
  currentMonthChanges: [ ChangeTrackerSchema ],
  changesArchive: { type: Object, default: {} },
  changes: [ ChangeTrackerSchema ]
});

// make sure the virtuals get added
ClassSchema.set('toObject', { virtuals: true });
ClassSchema.set('toJSON', { virtuals: true });

//--- HOOKS ---//
/**
 *  ARCHIVING EACH MONTH AND PRODUCING A SUMMARY CHANGE OBJECT
 *
 *  Before each save (every update/create or patch )
 *    Check the detail summary is for the current month.
 *    If not then archive it into monthlyDetailArchive
 *    If month has not changed then recalculate the closing total and update the changes sumamry object
 *
 *  IDEA: this pre save could be run for month, week, day etc
 */

ClassSchema.pre('save', function(next){
  // at first save of a new month, archive last month, set the period and the openingTotal
  const period = moment().format('MMM-YYYY');
  let currentMonthUpdate = null;

  if(this.currentMonthDetail.period !== period){
    // archives the current month at first save of a new month
    const lastMonth = JSON.parse(JSON.stringify(this.currentMonthDetail));
    this.monthlyDetailArchive[lastMonth.period]= lastMonth;

    currentMonthUpdate = startNewMonth(lastMonth.closingTotal, period);
  } else {
    currentMonthUpdate = this.currentMonthDetail;
  }

  // updates the closing total and the change summary object
  currentMonthUpdate.closingTotal = getClosingTotal(this.currentMonthChanges, currentMonthUpdate.openingTotal);
  currentMonthUpdate.changes = aggregateMonthChanges(this.currentMonthChanges);

  this.currentMonthDetail = currentMonthUpdate;
  next();
});

//--- VIRTUALS ---//

//--- METHODS ---//

ClassSchema.methods.newChange = function( changeObj ) {
  // on adding a new change, check it is for the current month,
  //  --> if it is then add it to current month array
  //  --> if its not then archive the current month array into an object with a key of MMM-YYYY

  const lastMonth = moment().subtract(1, 'month').format('MMM-YYYY');
  console.log('last month is:', lastMonth);
  console.log('period of the change is ', moment(changeObj.createdAt).format('MMM-YYYY'));

  if(moment(changeObj.createdAt).format('MMM-YYYY') !== lastMonth){
    console.log('running successfully!');
    // const prevMonthPeriod = moment().subtract(1, 'month').format('MMM-YYYY');
    // archive currentMonthChanges to detail archie object with key of period

    // NOTE: this is un tested as yet.
    this.changesArchive[lastMonth] = [...this.currentMonthChanges];

    // this.currentMonthChanges.forEach( change => this.changesArchive[change.period.format('MMM-YYYY')].push(change));
    this.currentMonthChanges = [];
    this.currentMonthChanges.push(changeObj);
    return this.save();
  }

  this.currentMonthChanges.push(changeObj);
  return this.save();
};

module.exports = mongoose.model('Class', ClassSchema);



//=== INTERNAL FUNCTION ===//
function startNewMonth(lastMonthClosing, period){
  const newMonth = {};

  // sets the period of the new month and passes on the closing total of last month
  newMonth.period = period;
  newMonth.openingTotal = lastMonthClosing;

  return newMonth;
}

// creates the summary object for the months changes
function aggregateMonthChanges(changes) {
  const updatedChanges = {};

  // accumulate the different changes for the month
  changes.forEach( change => {
    if(!updatedChanges[change.reasonForChange]){
      updatedChanges[change.reasonForChange] = change.animalsMoved;
    } else {
      updatedChanges[change.reasonForChange] += change.animalsMoved;
    }
  });

  return updatedChanges;
}

// calculates the closing total
function getClosingTotal( monthsChanges, openingTotal ) {
  let closingTotal = openingTotal;

  for( let i = 0; i < monthsChanges.length; i++ ){
    closingTotal += monthsChanges[i].animalsMoved;
  }
  return closingTotal;
}
