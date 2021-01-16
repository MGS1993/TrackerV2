const userModel = require('../models/userModel');
const expenses = require('../models/expensesModel');

//POST user
exports.add_user = function(req, res, next) {
  let user = new userModel(
    {
      userName: req.body.userName,
      
    }
  )
  user.save(function(err) {
    if(err) {return next(err)}
  })
};

//GET users
exports.display_users = function(req, res, next) {
  userModel.find({}).populate('Expenses')
  .then(userList => res.json(userList) )
  
  .catch(err => res.status(400).json('Error: ' + err))
}


