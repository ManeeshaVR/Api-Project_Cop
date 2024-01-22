const express = require('express');
const transactionController = require('../controller/TransactionController');
const verifyUser = require('../middleware/AuthMiddleware');
const depositController = require("../controller/DepositController");

const router = express.Router();

router.post('/create',verifyUser, transactionController.create);
router.delete('/delete-by-id/:id',verifyUser, transactionController.deleteById);
router.get('/find-all',verifyUser, transactionController.findAll);
router.get('/find-count',verifyUser, transactionController.findCount);
router.get('/find-amount',verifyUser, transactionController.findAmount);

module.exports=router;


