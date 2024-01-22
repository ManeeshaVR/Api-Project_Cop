const express = require('express');
const userController = require('../controller/UserController');
const verifyUser = require("../middleware/AuthMiddleware");
const depositController = require("../controller/DepositController");
const router = express.Router();
router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/find-count',verifyUser, userController.findCount);
module.exports=router;