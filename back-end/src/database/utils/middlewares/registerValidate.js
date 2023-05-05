const validateRegiderFields = async (req, res, next) => {
  const regex = /\S+@\S+\.\S+/;
  const { name, email, password } = req.body;

  if (!regex.test(email) || password.length < 6 || name.length < 12) {
    return res.status(409).json({ message: 'Bad Request' });
  }
  console.log('passei na validacao');
  return next();
};

module.exports = validateRegiderFields;
