const { User } = require('../models/User');

const validateUser = async (email) => {
  const isUser = await User.findOne({ where: { email } });
  if (isUser) {
    return ({ status: 409, message: 'User already exists.' });
  }
};

module.exports = validateUser;
