const express = require('express');
const validateLoginFields = require('../utils/middlewares/registerValidate');
const userController = require('../controllers/UserController'); // Fix the import here

const userRouter = express.Router();

userRouter.post('/', validateLoginFields, userController.createUser); // Fix the function name here
userRouter.post('/admin', validateLoginFields, userController.createUserByAdm);
userRouter.get('/users', userController.getUsers);

module.exports = userRouter;
