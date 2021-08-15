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
          error: true,
          message: "Votre mail ou password est errone"
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
              errors: true,
              message: "Votre mail ou password est errone"
            });
          }

          const payload = {
            sub: user._id,
            email: user.email,
          };

          const refreshtoken = await jwt.sign(payload, 'secretKey');
          const valueToken = {
            token: user.token,
            refresh_token: refreshtoken,
            createdAt: user.createdAt,
          }

          return res.status(200).json({
            error: true,
            message: "L'utilisateur a ete authentifie succes",
            token: valueToken,
          });
        }
      );
    });
  } else {
    return res.status(422).json({
      error: true,
      message: "L'email/password est manquant",
    });
  }
};

module.exports = Login;
