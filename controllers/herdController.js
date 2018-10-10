const Herd = require('../models/herd');

function herdNew(req, res, next) {
  Herd
    .create(req.body)
    .then(herds => res.status(201).json(herds))
    .catch(next);
}

module.exports ={
  create: herdNew
};
