"use strict";var User=require("../models/user");function userShowPage(a,b,c){User.findById(a.params.id).then(function(a){return b.json(a)}).catch(c)}function userEdit(a,b,c){User.findById(a.params.id).then(function(b){return b.set(a.body)}).then(function(a){return a.save()}).then(function(a){return b.status(201).json(a)}).catch(c)}function userDelete(a,b,c){User.findById(a.params.id).then(function(a){return a.remove()}).then(function(){return b.sendStatus(204)}).catch(c)}module.exports={show:userShowPage,update:userEdit,delete:userDelete};