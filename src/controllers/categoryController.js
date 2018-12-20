import Category from '../models/category';

function newCategory(req, res, next) {
  Category.create(req.body)
    .then(categories => res.status(201).json(categories))
    .catch(next);
}

function indexcategories(req, res, next) {
  Category.find()
    .populate('farm')
    .then(categories => res.json(categories))
    .catch(next);
}

function showCategory(req, res, next) {
  Category.findById(req.params.id)
    .populate('farm')
    .then(category => category.generateMonthsDetail())
    .then(category => res.json(category))
    .catch(next);
}

function updateCategory(req, res, next) {
  Category.findById(req.params.id)
    .then(category => {
      category.set(req.body);
      return category.save();
    })
    .then(category => res.status(202).send(category))
    .catch(next);
}

function deleteCategory(req, res, next) {
  Category.findById(req.params.id)
    .then(category => category.remove())
    .then(() => res.status(202).send({ message: 'Category Deleted' }))
    .catch(next);
}

function newTrackedChange(req, res, next) {
  Category.findById(req.params.categoryId)
    .then(category => category.newChange(req.body))
    .then(category => res.status(201).json(category))
    .catch(next);
}

function editTrackedChange(req, res, next) {
  Category.findById(req.params.categoryId)
    .then(category => {
      const change = category.currentMonthChanges.id(req.params.changeId);
      change.set(req.body);
      return category.save();
    })
    .then(category => res.status(202).send(category))
    .catch(next);
}

function deleteTrackedChange(req, res, next) {
  Category.findById(req.params.categoryId)
    .then(category => {
      category.currentMonthChanges.id(req.params.changeId).remove();
      category.save();
    })
    .then(() => res.status(202).send({ message: 'Change Deleted' }))
    .catch(next);
}

function showTrackedChange(req, res, next) {
  Category.findById(req.params.categoryId)
    .then(category => category.currentMonthChanges.id(req.params.changeId))
    .then(change => res.send(change))
    .catch(next);
}

export default {
  create: newCategory,
  index: indexcategories,
  show: showCategory,
  edit: updateCategory,
  delete: deleteCategory,
  createChange: newTrackedChange,
  editChange: editTrackedChange,
  deleteChange: deleteTrackedChange,
  showChange: showTrackedChange
};
