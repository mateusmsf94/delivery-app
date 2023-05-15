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
    const { statusCode, data } = await UserService.getSellers();
    return res.status(statusCode).json(data); 
  } catch (error) {
    console.error(error);
    return res
      .status(error.statusCode || 500)
      .json({ message: error.message || ERROR_MESSAGE });
  }
};

const getUsers = async (_req, res) => {
  try {
    const { statusCode, data } = await UserService.getUsers();
    return res.status(statusCode).json(data);
  } catch (error) {
    return res
    .status(error.statusCode || 500)
    .json({ message: error.message || ERROR_MESSAGE });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { authorization } = req.headers;
    const { statusCode } = await UserService.deleteUser(id, authorization);
    return res.status(statusCode).end();
  } catch (error) {
    return res
    .status(error.statusCode || 500)
    .json({ message: error.message || ERROR_MESSAGE });
  }
};

const userController = { createUser, getSellersData, createUserByAdm, getUsers, deleteUser };

module.exports = userController;
