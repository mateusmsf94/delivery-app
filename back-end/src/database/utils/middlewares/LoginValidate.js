const validateLoginFields = async (req, res, next) => {
  const regex = /\S+@\S+\.\S+/;
  const { email, password } = req.body;

  if (!regex.test(email) || password.length < 6) {
    return res.status(409).json({ message: 'Bad Request' });
  }

  return next();
};

module.exports = validateLoginFields;
