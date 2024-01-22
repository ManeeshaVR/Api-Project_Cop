const express = require('express');
const memberController = require('../controller/MemberController');
const verifyUser = require('../middleware/AuthMiddleware');

const router = express.Router();

router.post('/create',verifyUser, memberController.create);
router.get('/find-by-id/:id',verifyUser, memberController.findById);
router.delete('/delete-by-id/:id',verifyUser, memberController.deleteById);
router.put('/update/:id',verifyUser, memberController.update);
router.get('/find-all',verifyUser, memberController.findAll);
router.get('/find-count',verifyUser, memberController.findCount);
router.post('/mail',verifyUser, memberController.mailMember);

module.exports=router;


