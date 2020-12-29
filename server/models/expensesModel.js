const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema (
  {
    expenseName: {type:String, required: true},
    expensePrice: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, required:true, ref: 'Users'}
  }
);



module.exports = mongoose.model('Expenses', ExpensesSchema);
