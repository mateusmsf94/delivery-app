const express = require('express');
const validateLoginFields = require('../utils/middlewares/LoginValidate');
const { createUser } = require('../services/UserService');

const userRouter = express.Router();

userRouter.post('/', validateLoginFields, createUser);

module.exports = userRouter;
