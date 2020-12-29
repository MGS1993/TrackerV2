const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema (
  {
    expenseName: {type:String, required: true},
    expensePrice: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, required:true, ref: 'Users'}
  }
);

//Virtual

//Virtual for total expenses in DB



module.exports = mongoose.model('Expenses', ExpensesSchema);
