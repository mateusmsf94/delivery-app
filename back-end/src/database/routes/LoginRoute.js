const express = require('express');
const loginController = require('../controllers/LoginController');
const validateLoginFields = require('../utils/middlewares/loginValidate');
const validateTokenMiddleware = require('../utils/middlewares/validateTokenMiddleware');

const loginRouter = express.Router();

loginRouter.post('/', validateLoginFields, loginController);
loginRouter.post('/validate', validateTokenMiddleware, (req, res) => {
  // If the middleware did not return an error, the token is valid
  res.json({ message: 'Token is valid' });
});

module.exports = loginRouter;
