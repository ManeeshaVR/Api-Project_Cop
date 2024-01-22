const express = require('express');
const depositController = require('../controller/DepositController');
const verifyUser = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/create',verifyUser, depositController.create);
router.get('/find-by-id/:id',verifyUser, depositController.findById);
router.get('/find-by-memberNo/:memberNo',verifyUser, depositController.findByNo);
router.delete('/delete-by-id/:id',verifyUser, depositController.deleteById);
router.put('/update/:id',verifyUser, depositController.update);
router.put('/update-specDeposit/:id',verifyUser, depositController.updateSpecDeposit);
router.put('/update-deposits/:id',verifyUser, depositController.updateDeposits);
router.get('/find-all',verifyUser, depositController.findAll);
router.get('/find-count',verifyUser, depositController.findCount);
router.get('/find-shares',verifyUser, depositController.findShares);
router.get('/find-comDeposits',verifyUser, depositController.findComDeposits);
router.get('/find-specDeposits',verifyUser, depositController.findSpecDeposits);
router.get('/find-penDeposits',verifyUser, depositController.findPenDeposits);

module.exports=router;


