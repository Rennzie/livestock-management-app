import User from '../models/user';

function userShowPage(req, res, next) {
  User.findById(req.params.id)
    .populate({ path: 'farms', populate: { path: 'categories' } })
    .then(user => res.json(user))
    .catch(next);
}

function userEdit(req, res, next) {
  User.findById(req.params.id)
    .then(user => user.set(req.body))
    .then(user => user.save())
    .then(user => res.status(201).json(user))
    .catch(next);
}

function userDelete(req, res, next) {
  User.findById(req.params.id)
    .then(user => user.remove())
    .then(() => res.sendStatus(204))
    .catch(next);
}

function userIndex(req, res, next) {
  User.find()
    .then(users => res.json(users))
    .catch(next);
}

export default {
  show: userShowPage,
  update: userEdit,
  delete: userDelete,
  index: userIndex
};
