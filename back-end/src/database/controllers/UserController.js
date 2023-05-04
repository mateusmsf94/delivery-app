const { UserService } = require('../services');

const createUser = async (req, res) => {
  const { statusCode, data, message } = await UserService.createUser(req.body);
  if (message) return res.status(statusCode).json(message);

  return res.status(statusCode).json(data);
};

module.exports = createUser;
