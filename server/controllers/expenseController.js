const expenses = require('../models/expensesModel');

exports.all_expenses = function(req, res, next) {
  expenses.find({})
  .then(expenseList => res.json(expenseList) )
  .catch(err => res.status(400).json('Error: ' + err))
}