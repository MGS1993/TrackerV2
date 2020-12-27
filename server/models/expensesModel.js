const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ExpensesSchema = new Schema (
  {
    itemName: {type:String, required: true},
    itemPrice: {type: String, required: true}
  }
);



module.exports = mongoose.model('Expenses', ExpensesSchema);
