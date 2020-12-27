let express = require('express');
let router = express.Router();

//REQUIRE CONTROLLER MODULES
const expenseController = require('../controllers/expenseController');
//EXPENSES ROUTES
router.get('/expenses', expenseController.all_expenses);


module.exports = router;