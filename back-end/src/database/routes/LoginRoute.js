const express = require('express');
const loginController = require('../controllers/LoginController');
const validateLoginFields = require('../utils/middlewares/loginValidate');

const loginRouter = express.Router();

loginRouter.post('/', validateLoginFields, loginController);

module.exports = loginRouter;
