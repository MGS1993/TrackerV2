let express = require('express');
let router = express.Router();

//REQUIRE CONTROLLER MODULES
const expenseController = require('../controllers/expenseController');
const userController = require('../controllers/userController');

//EXPENSES ROUTES
//GET all expenses
router.get('/expenses', expenseController.all_expenses);
//GET expenses by user
router.get('/userExpenses/:id', expenseController.user_expenses);
///POST expense
router.post('/add-expense', expenseController.add_expense);
//POST Delete Expense
router.post('/expenses/:id/delete', expenseController.expense_delete)
//UPDATE Edit Expense
router.put('/expenses/:id/update', expenseController.update_expense)




//USER ROUTES
//POST user
router.post('/create-user', userController.add_user);
//GET user
router.get('/display-users', userController.display_users);
//get test
router.get('/test', expenseController.test_pop);
//userLogin
router.post('/login', userController.login);


module.exports = router;