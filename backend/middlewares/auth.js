const jwt = require('jsonwebtoken');
const TokenManager = require('../utils/token_manager');

function authenticate(requiredRole) {
  return (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ error: 'Token is missing!' });

    jwt.verify(token.split(' ')[1], TokenManager.SERVER_SECRET_KEY, (err, payload) => {
      if (err) return res.status(401).json({ error: err.name === 'TokenExpiredError' ? 'Token has expired!' : 'Invalid token!' });
      if (payload.permission < requiredRole) return res.status(403).json({ error: 'Access forbidden!' });

      req.user = payload;
      next();
    });
  };
}

module.exports = { authenticate };