const express = require('express');
const userController = require('../controllers/UserController'); // Fix the import here

const userRouter = express.Router();

userRouter.get('/', userController.getUsers);
userRouter.get('/sellers', userController.getSellersData);
userRouter.delete('/:id', userController.deleteUser);

module.exports = userRouter;
