const { UserService } = require('../services');

const createUser = async (req, res) => {
  try {
    const { statusCode, data } = await UserService.createUser(req.body);
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || 'Internal Server Error' });
  }
};

module.exports = createUser;
