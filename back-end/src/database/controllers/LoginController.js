const { LoginService } = require('../services');

const loginController = async (req, res) => {
  const { statusCode, data, message } = await LoginService(req.body);

  if (message) return res.status(statusCode).json(message);

  return res.status(statusCode).json(data);
}; 

module.exports = loginController;
