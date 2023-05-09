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

const getSellersData = async (_req, res) => {
  try {
    const data = await UserService.getSellers();
    return res.status(200).json(data); 
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || 'Internal Server Error' });
  }
};

const userController = { createUser, getSellersData };

module.exports = userController;
