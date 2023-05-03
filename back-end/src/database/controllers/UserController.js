const { UserService } = require('../services')

const getUserByEmail = async (req, res) => {
  try {
    const { email } = req.body;
    
    const userByEmail = await UserService.getByEmail(email);
    if(userByEmail) { return res.status(200).json(userByEmail) };

    return res.status(404).json({ message: "User does not exist" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { getUserByEmail };
