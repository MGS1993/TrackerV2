let express = require('express');
let router = express.Router();

//REQUIRE CONTROLLER MODULES
const expenseController = require('../controllers/expenseController');
const userController = require('../controllers/userController');

//EXPENSES ROUTES
//get all expenses
router.get('/expenses', expenseController.all_expenses);
///POST expense
router.post('/add-expense', expenseController.add_expense);



//USER ROUTES
//POST user
router.post('/create-user', userController.add_user);
//GET user
router.get('/display-users', userController.display_users);
//get test
router.get('/test', expenseController.test_pop);


module.exports = router;