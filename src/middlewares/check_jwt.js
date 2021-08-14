const jwt = require('jsonwebtoken');

const verifyJWT = async (req, res, next) => {
  const _token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  jwt.verify(_token, 'secretKey', (error, decoded) => {
    if (error) {
      return res.status(401).json({
        errors: error,
      });
    }

    if (decoded) {
      req.userData = decoded;
      next();
    }
  });
};

module.exports = verifyJWT;
