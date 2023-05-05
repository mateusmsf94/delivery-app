const express = require('express');
const validateLoginFields = require('../utils/middlewares/LoginValidate');
const { createUser } = require('../services/UserService');

const userRouter = express.Router();

// userRouter.post('/', validateLoginFields, createUser);
userRouter.post('/', (req, res) => {
  console.log('Request received:', req.body);

  // You can also use a debugger statement if you're using a tool that supports breakpoints
  // debugger;

  // Your registration logic here

  res.status(200).json({ message: 'Registration successful' });
});

module.exports = userRouter;
