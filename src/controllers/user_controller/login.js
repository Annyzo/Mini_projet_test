const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');


const Login = async (req, res) => {
  const _email = req.body.email;
  const _password = req.body.password;

  await body('email').isEmail().run(req);
  await body('password').isLength({ min: 4 }).run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(401).json({ 
      error: true,
      message :"L'un ou plusieur des donnees obligatoire ne sont pas conforme " });
  }

  const secretToken = process.env.ACCESS_TOKEN_SECRET ;
  const tokenExpire = process.env.ACCESS_TOKEN_EXPIRY;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;


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

          // Payload inside access-token
        const payload = {
          id: user._id,
          email: user.email,
        };

         // access-token-generate
        const _token = await jwt.sign(
          { email: _email },
          secretToken,
          {expiresIn:tokenExpire}
        );

        // reresh-token generation
        const refreshtoken = await jwt.sign(
          payload,
          refreshTokenSecret,
          {expiresIn: refreshTokenExpiry,}
        );
        
        const valueToken = {
          token: _token,
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
