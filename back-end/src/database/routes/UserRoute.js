const express = require('express');
const validateLoginFields = require('../utils/middlewares/registerValidate');
const userController = require('../controllers/UserController'); // Fix the import here

const userRouter = express.Router();

userRouter.post('/', validateLoginFields, userController.createUser); // Fix the function name here

module.exports = userRouter;
