const User = require('../../models/user');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const Register = (req, res) => {
  const _firstname = req.body.firstname
  const _name = req.body.name
  const _email = req.body.email;
  const _password = req.body.password;
  const _date = req.body.dateNaissance;
  const _sexe = req.body.sexe;

  const secretToken = process.env.ACCESS_TOKEN_SECRET ;
  const tokenExpire = process.env.ACCESS_TOKEN_EXPIRY;
  const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
  const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY;


  // console.log('voila',_email)

  if (_firstname && _name && _email && _password && _date && _sexe ) {

    

    // Vérifiez si l'utilisateur existe déjà
    User.findOne({ email: _email }, (error, user) => {
      if (error) {
        return res.status(400).json({
          error: error,
        });
      }

      if (user) {
        return res.status(401).json({
          error: true,
          message: `Votre mail n'ai pas correct`,
        });
      }

      // Créer un nouvel utilisateur s'il n'existe pas déjà
      const newUser = new User({
        firstname: _firstname,
        lastname: _name,
        email: _email,
        date_naissance: _date,
        password: _password,
        sexe: _sexe,
      });

      newUser.save(async (error) => {
        if (error) {
          return res.status(400).json({
            errors: error,
          });
        }

        // Payload inside access-token
        const payload = {
          id: newUser._id,
          email: newUser.email,
        };

        // access-token generation
        const accesstoken = await jwt.sign(
          payload,
          secretToken,
          {expiresIn: tokenExpire,}
        );
        
        // Refresh token generation
        const refreshToken = jwt.sign(
          payload, 
          refreshTokenSecret,
          { expiresIn: refreshTokenExpiry })
      
        const valueToken = {
          token: accesstoken,
          refresh_token: refreshToken,
          createdAt: newUser.createdAt,
        }
        return res.status(201).json({
          message: "L'utilisateur a bien ete cree avec succes",
          token: valueToken,
        });
      });
    });

  } else {
    return res.status(401).json({
      error: "L'une ou plusieur des donnes obigatoire sont manquqant",
    });
  }

};

module.exports = Register;
