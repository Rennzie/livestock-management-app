"use strict";var jwt=require("jsonwebtoken"),User=require("../models/user"),_require=require("../config/environment"),SECRET=_require.SECRET;function createAndSendToken(a,b,c){var d={sub:a.id,username:a.username},e=jwt.sign(d,SECRET,{expiresIn:"6h"});return b.status(201).json({message:c,token:e})}function login(a,b,c){User.findOne({email:a.body.email}).then(function(c){return c&&c.validatePassword(a.body.password)?createAndSendToken(c,b,"Welcome back ".concat(c.username,"!")):b.status(401).json({message:"Unauthorised ".concat(a.body.email)});// user validation succeeded
}).catch(c)}// old register function without logging in.
function register(a,b,c){User.create(a.body).then(function(a){return b.status(201).json({message:"Create a new user: ".concat(a.username),user:a})}).catch(c)}// by sending a token on register the user will automagically be logged in!
// function register(req, res, next) {
//   User.create(req.body)
//     .then(user => createAndSendToken(user, res, `Created, ${user.username}`))
//     .catch(next);
// }
module.exports={login:login,register:register};