const express = require('express');
const validateLoginFields = require('../utils/middlewares/registerValidate');
const createUserController = require('../controllers/UserController'); // Fix the import here

const userRouter = express.Router();

userRouter.post('/', validateLoginFields, createUserController); // Fix the function name here

module.exports = userRouter;
