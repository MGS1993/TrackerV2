const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema (
  {
    expenseName: {type:String, required: true},
    expensePrice: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, required:true, ref: 'Users'},
    category: {type:String, required: true},
    time: {type: Date, default: Date.now },
    date: {type: Date, default: Date.now }
  }
);

//Virtual

//Virtual last month's expenses
// ExpensesSchema
// .virtual('last_month')
// .get(function () {
  
// })



module.exports = mongoose.model('Expenses', ExpensesSchema);
