const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    userName: {type:String, required: true},
    expenses: [{  type: Schema.Types.ObjectId, ref: 'Expenses'}]
  }
);


module.exports = mongoose.model('Users', UserSchema);