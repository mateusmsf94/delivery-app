const { UserService } = require('../services');

const ERROR_MESSAGE = 'Internal Server Error';

const createUser = async (req, res) => {
  try {
    const { statusCode, data } = await UserService.createUser(req.body);
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || ERROR_MESSAGE });
  }
};

const createUserByAdm = async (req, res) => {
  try {
    const { authorization } = req.headers;
    const { statusCode, data } = await UserService.createUserByAdm(req.body, authorization);
    return res.status(statusCode).json(data);
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || ERROR_MESSAGE });
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
      .json({ message: error.message || ERROR_MESSAGE });
  }
};

const userController = { createUser, getSellersData, createUserByAdm };

module.exports = userController;
