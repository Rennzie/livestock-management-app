import Category from '../models/category';

function newCategory(req, res, next) {
  Category.create(req.body)
    .then(categories => res.status(201).json(categories))
    .catch(next);
}

// Note: Need to think about how we incorporate multiple farms into the equation.

function indexcategories(req, res, next) {
  Category.find()
    .populate('farm')
    .then(categories => res.json(categories))
    .catch(next);
}

function showCategory(req, res, next) {
  Category.findById(req.params.id)
    .populate('farm')
    .then(oneCategory => res.json(oneCategory))
    .catch(next);
}

function newTrackedChange(req, res, next) {
  Category.findById(req.params.classId)
    .then(oneCategory => oneCategory.newChange(req.body))
    .then(oneCategory => res.status(201).json(oneCategory))
    .catch(next);
}

export default {
  create: newCategory,
  index: indexcategories,
  show: showCategory,
  createChange: newTrackedChange
};
