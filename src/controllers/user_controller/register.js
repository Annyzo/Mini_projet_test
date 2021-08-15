const User = require('../../models/user');
const jwt = require("jsonwebtoken");
require('dotenv').config();


const Register = async (req, res) => {
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

  await body('email').isEmail().run(req);
  await body('password').isLength({ min: 4 }).run(req);

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(401).json({ 
      error: true,
      message :"L'un ou plusieur des donnees obligatoire ne sont pas conforme " });
  }


  // console.log('voila',_email)

  if (_firstname && _name && _email && _password && _date && _sexe ) {

    
    // Vérifiez si l'utilisateur existe déjà
    User.findOne({ email: _email }, (error, user) => {
      if (error) {
        return res.status(401).json({
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
          return res.status(401).json({
            message: 'nonon',
            errors: error,
          });
        }

        // Payload inside access-token
        const payload = {
          id: newUser._id,
          email: newUser.email,
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
      error: "L'une ou plusieur des donnes obigatoire sont manquant",
    });
  }

};

module.exports = Register;
