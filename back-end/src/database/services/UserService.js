const { User } = require('../models');

const getByEmail = async (email) => User.findOne({ where: { email } });
const createUser = async (user) => User.create({ ...user })

module.exports = { getByEmail, createUser };
