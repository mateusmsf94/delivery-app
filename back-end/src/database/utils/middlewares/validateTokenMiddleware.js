const { validateToken } = require('../jwt');

const validateTokenMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) {
    return res.status(401).json({ error: 'Missing token' });
  }

  try {
    const user = validateToken(token);
    req.user = user; // save the user info to req.user for further use
    next(); // move on to the next middleware function
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

module.exports = validateTokenMiddleware;
