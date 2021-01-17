
const expenses = require('../models/expensesModel');
// const userModel = require('../models/userModel')
//userModel wasn't needed. -reminder-


//Lists all expenses
exports.all_expenses = function(req, res, next) {
  expenses.find({}).populate('user')
  .then(expenseList => res.json(expenseList) )
  .catch(err => res.status(400).json('Error: ' + err))
}

//POST new expense
exports.add_expense = function(req, res, next) {
  let expense = new expenses(
    {
      expenseName: req.body.expenseName,
      expensePrice: req.body.expensePrice,
      user: req.body.user,
      category: req.body.category,
      date: req.body.date 
    }
  );
  
  expense.save(function(err) {
    if(err) {return next(err)}
  })          
}
//DELETE Expense
exports.expense_delete = function(req, res, next) {
  expenses.findByIdAndDelete(req.params.id)
    .then(() => res.json('Expense deleted'))
    .catch(err => res.status(400).json('Error: ' + err))
}
exports.test_pop = function(req, res, next) {
  expenses
    .find({category: 'Groceries'})
    .then(stories => res.json(stories))
    .catch(err => res.status(400).json('Error: ' + err))
}
exports.update_expense = function(req, res, next) {
  expenses.findOneAndUpdate({_id: req.body.selected}, {
    expenseName: req.body.expenseName,
    expensePrice: req.body.expensePrice,
    category: req.body.category,
    date: req.body.date
  }, (error, data) => {
    if(error) {
      console.log(error)
    }else {
      console.log(data)
    }
  })
}