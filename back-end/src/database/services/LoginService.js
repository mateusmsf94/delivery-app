const md5 = require('md5');
const { User } = require('../models');
const NotFound = require('../utils/ErrorStatus/NotFound');
const { createToken } = require('../utils/jwt');

const loginService = async ({ email, password }) => {
  const user = await User.findOne({
    where: { email, password: md5(password) },
    attributes: { exclude: ['password'] },
  });

  if (!user) throw new NotFound('Invalid fields');

  const token = createToken(
user.dataValues.id, 
user.dataValues.name,
user.dataValues.email, 
user.dataValues.role,
);
  return { statusCode: 200, data: { ...user.dataValues, token } };
};

module.exports = loginService;
