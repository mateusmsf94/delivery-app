const express = require('express');
const loginController = require('../controllers/LoginController');
const validateLoginFields = require('../utils/middlewares/LoginValidate');

const loginRouter = express.Router();

loginRouter.post('/', validateLoginFields, loginController);

module.exports = loginRouter;
