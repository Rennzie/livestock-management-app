import Class from '../models/class';

function newClass(req, res, next) {
  Class.create(req.body)
    .then(classes => res.status(201).json(classes))
    .catch(next);
}

// Note: Need to think about how we incorporate multiple farms into the equation.

function indexClasses(req, res, next) {
  Class.find()
    .then(classes => res.json(classes))
    .catch(next);
}

function showClass(req, res, next) {
  Class.findById(req.params.id)
    .then(oneClass => res.json(oneClass))
    .catch(next);
}

function newTrackedChange(req, res, next) {
  Class.findById(req.params.classId)
    .then(oneClass => oneClass.newChange(req.body))
    .then(oneClass => res.status(201).json(oneClass))
    .catch(next);
}

export default {
  create: newClass,
  index: indexClasses,
  show: showClass,
  createChange: newTrackedChange
};
