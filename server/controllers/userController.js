const userModel = require('../models/userModel');
// const expenses = require('../models/expensesModel');
const bcrypt = require("bcrypt");

//POST user
exports.add_user = async (req, res, next) => {
  try{
    const { userName, passWord, passWordCheck } = req.body
    if(!userName || !passWord || !passWordCheck) {
      return res
      .status(400)
      .json({msg: "Not all field have been entered."})
    }
    if(passWord.length < 5) {
      return res
      .status(400)
      .json({msg: "Password needs to be at least 5 characters long"})
    }
    if(passWord !== passWordCheck) {
      return res
      .status(400)
      .json({msg: "Passwords do not match"})
    }
    const existingUser = await userModel.findOne({userName:userName})
    if(existingUser) {
      return res
      .status(400)
      .json({msg: "UserName already taken"})
    }
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(passWord, salt);
    let user = new userModel(
      {
        userName: userName,
        passWord: passwordHash,
      }
    )
    user.save( await function(err) {
      if(err) {return next(err)}
    })
  } catch(err) {
    res.status(500);
    console.log(err)
  }
  
};
//GET users
exports.display_users = function(req, res, next) {
  userModel.find({}).populate('expenses')
  .then(userList => res.json(userList) )
  .catch(err => res.status(400).json('Error: ' + err))
}

exports.login = async (req, res, next) => {
  try{
    const user = await userModel.findOne({userName: req.body.userName})
    if(user === null) {
    return res.status(400).send('Cannot find user').end()
  }
     if( await bcrypt.compare(req.body.passWord, user.passWord)) {
       return res
      .send({user})
      .status(200)
      
    } else {
      res.status(500)
      res.send('Not allowed')
    }
  }catch(err) {
    console.log(err)
  }
}



