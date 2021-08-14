const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = (req, res) => {
  const _email = req.body.email;
  const _password = req.body.password;

  if (_email && _password) {
    User.findOne({ email: _email }, (error, user) => {
      if (error) {
        return res.status(400).json({
          errors: error,
        });
      }

      if (!user) {
        return res.status(404).json({
          errors: 'user not found',
        });
      }

      bcrypt.compare(
        _password,
        user.password,
        async (error, isMatch) => {
          if (error) {
            return res.status(400).json({
              errors: error,
            });
          }

          if (!isMatch) {
            return res.status(401).json({
              errors: 'wrong password',
            });
          }

          const payload = {
            sub: user._id,
            email: user.email,
          };

          const token = await jwt.sign(payload, 'secretKey');

          return res.status(200).json({
            message: 'login success',
            data: user,
            token: token,
          });
        }
      );
    });
  } else {
    return res.status(422).json({
      errors: 'email/password missings',
    });
  }
};

module.exports = Login;
