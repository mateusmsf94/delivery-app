const express = require('express');
const userController = require('../controllers/UserController'); // Fix the import here

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/sellers', userController.getSellersData);

module.exports = userRouter;
