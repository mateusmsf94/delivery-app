const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../models');
const Conflict = require('../utils/ErrorStatus/Conflict');
const { createToken, validateToken } = require('../utils/jwt');

const createUser = async (user) => {
  const isUser = await User.findOne({
    where: { [Op.or]: [{ email: user.email }] },
  });
  if (isUser) throw new Conflict('User already exists');

  const userCreated = await User.create({
    name: user.name,
    email: user.email,
    password: md5(user.password),
    role: 'customer',
  });

  const token = createToken(userCreated.id, userCreated.name, userCreated.email, userCreated.role);
  return { statusCode: 201, data: { ...userCreated.dataValues, token } };
};

const createUserByAdm = async (user, token) => {
  validateToken(token);

  const isUser = await User.findOne({
    where: { [Op.or]: [{ email: user.email }] },
  });
  if (isUser) throw new Conflict('User already exists');

  const userCreated = await User.create({
    name: user.name,
    email: user.email,
    password: md5(user.password),
    role: user.role,
  });

  return { statusCode: 201, data: { ...userCreated.dataValues } };
};

const getSellers = async () => {
  const sellers = await User.findAll({
    where: { [Op.or]: [{ role: 'seller' }] },
    attributes: ['id', 'name'],
  });

  return { statusCode: 200, data: sellers };
};

const getUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'name', 'email', 'role'],
  });

  return { statusCode: 200, data: users };
};

module.exports = { createUser, getSellers, createUserByAdm, getUsers };
