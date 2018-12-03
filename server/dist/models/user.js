"use strict";var mongoose=require("mongoose"),bcrypt=require("bcrypt"),userSchema=new mongoose.Schema({username:{type:String,unique:!0},email:{type:String,unique:!0},password:{type:String,require:!0},firstName:String,surname:String,farmName:String,dateOfBirth:Date});// PLUGINS
// throw validation error when duplicate emails are created
// METHODS
// password validation
// LIFECYCLE HOOKS
// hash a password if it is updated
userSchema.plugin(require("mongoose-unique-validator")),userSchema.methods.validatePassword=function(a){return bcrypt.compareSync(a,this.password)},userSchema.pre("save",function(a){this.isModified("password")&&(this.password=bcrypt.hashSync(this.password,8)),a()}),module.exports=mongoose.model("User",userSchema);