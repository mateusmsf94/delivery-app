const { LoginService } = require('../services');

const loginController = async (req, res) => {
  try {
  const { statusCode, data } = await LoginService(req.body);

  return res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res
    .status(error.statusCode || 500)
    .json({ message: error.message || 'Internal Server Error' });
  }
}; 

module.exports = loginController;
