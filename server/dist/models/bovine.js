"use strict";var mongoose=require("mongoose"),ObjectId=mongoose.Schema.Types.ObjectId,moment=require("moment"),weightsSchema=new mongoose.Schema({timing:{type:String,enum:["birth","sale","other"]},date:Number,weight:Number,unit:String},{timestamps:!0});weightsSchema.set("toObject",{virtuals:!0}),weightsSchema.set("toJSON",{virtuals:!0}),weightsSchema.virtual("formattedWeighDate").get(function(){var a=moment(this.createdAt);return moment(a).format("DD/MM/YYYY")});var pregTestSchema=new mongoose.Schema({date:Number,isPregnant:{type:Boolean,default:null},testedBy:String},{timestamps:!0}),bovineSchema=new mongoose.Schema({identifier:String,category:{type:String,enum:["calf","weaner","ox","cow","bull","bull-calf","heifer"]},birthDate:Number,purchaseDate:Number,breed:String,mother:{type:ObjectId,ref:"Bovine"},herd:{type:ObjectId,ref:"Herd",default:null},weights:[weightsSchema],// --- BREEDING DETAILS ---///
// NOTE: need answer about what is NB for mating period to track etc to see what else should be tracked
breeding:{status:{type:Boolean,default:!1},// NOTE: set to false when calf is born, leaving in for now until better understanding of the breeding flow
isPregnant:{type:Boolean,default:!1},pregTestingHistory:[pregTestSchema],// notInCalf: { type: Boolean, default: false },
production:[{type:ObjectId,ref:"Bovine"}],calvingPeriod:String},// --- FATTENING DETAILS ---///
fattening:{dateStarted:Number,status:{type:Boolean,default:!1},// type: { type: String, enum: ['feedlot', 'grasslot'] },
period:String},// --- ARCHIVING ---///
// NOTE: once transfered, what happens to this bovines archived status
isArchived:{type:Boolean,default:!1},// methodOfRemoval: {type: String, enum: ['sale', 'death', 'theft']},
deathDate:Number,causeOfDeath:String,archivingComments:String,// Ultimately this will contain x-y data and be mappable.
locationOfDeath:String,// --- SALE DETAILS ---///
sale:{saleRevenue:Number,revenueCurrency:String,saleDate:Number// owners: [{ type: ObjectId, ref: 'User' }]
}},{timestamps:!0});// make sure the virtuals get added
// --- VIRTUALS ---//
// bovineSchema.virtual('formattedSaleDate')
//   .get(formatDate(this.birthDate));
// --- METHODS ---//
// NOTE: might not be necessary to toggle if only setting to false at calf registration
// To add a newly registered calf to production array and set isPregnant to false
// --- INTERNAL FUNCTIONS ---//
// function formatDate(unixDate){
//   const momentObj = moment.unix(unixDate);
//   return moment(momentObj).format('DD/MM/YYYY');
// }
bovineSchema.set("toObject",{virtuals:!0}),bovineSchema.set("toJSON",{virtuals:!0}),bovineSchema.virtual("formattedBirthDate").get(function(){var a=moment.unix(this.birthDate);return moment(a).format("DD/MM/YYYY")}),bovineSchema.methods.addWeight=function(a){return this.weights.push(a),this.save()},bovineSchema.methods.addPregTest=function(a){// add the test to the animals history
// update the global isPregnant status
this.breeding.pregTestingHistory.push(a),this.breeding.isPregnant=a.isPregnant,this.save()},bovineSchema.methods.setBreedingStatus=function(){this.breeding.status=!0,this.save()},bovineSchema.methods.setFatteningStatus=function(){this.fattening.status=!0,this.save()},bovineSchema.methods.addNewCalf=function(a){// resets the global isPregnant status to false after calf is registered
this.breeding.isPregnant=!1,this.breeding.production.push(a),this.save()},module.exports=mongoose.model("Bovine",bovineSchema);