const md5 = require('md5');
const { Op } = require('sequelize');
const { User } = require('../models');
const Conflict = require('../utils/ErrorStatus/Conflict');
const { createToken } = require('../utils/jwt');

const createUser = async (user) => {
  const isUser = await User.findOne({
    where: { [Op.or]: [{ name: user.name }, { email: user.email }] },
  });
  if (isUser) throw new Conflict('User already exists');

  const userCreated = await User.create({
    name: user.name,
    email: user.email,
    password: md5(user.password),
    role: 'customer',
  });

  const token = createToken(userCreated.id, userCreated.name, userCreated.email, userCreated.role);

  return {
    statusCode: 200, data: { ...userCreated.dataValues, token },
  };
};

module.exports = { createUser };
