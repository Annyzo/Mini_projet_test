const User = require('../../models/user');
const jwt = require("jsonwebtoken");
const Joi = require('joi');

const Register = (req, res) => {
  const _firstname = req.body.firstname
  const _name = req.body.name
  const _email = req.body.email;
  const _password = req.body.password;
  const _date = req.body.dateNaissance;
  const _sexe = req.body.sexe;
  
  // console.log('voila',_email)

  if (_firstname && _name && _email && _password && _date && _sexe ) {

    // definir les type de donne
    const schema = Joi.object().keys({
      firstname: Joi.string().min(4).required(),
      name: Joi.string().min(4).required(),
      email: Joi.string().email({ minDomainAtoms: 2 }).required(),
      password: Joi.string()
        .min(8)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        )
        .required(),
      date: Joi.date().required(),
      sexe: Joi.string().required(),
    });

    // Tester les le donne si est conforme 
    Joi.validate(
      {
        firstname: _firstname,
        name: _name,
        email: _email,
        date: _date,
        password: _password,
        sexe: _sexe,
      },
      schema,
      (validateErr) => {
        if (validateErr) {
          return res.status(401).json({
            error: true,
            message: "L'un de donne des donnees obligatoire ne sont pas conformes",
          });
        }
        return next();
      }
    );

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

        

        const payload = {
          sub: newUser._id,
          email: newUser.email,
        };

        const token = await jwt.sign(payload, 'secretKey');

        return res.status(201).json({
          message: 'account registered successfully',
          data: newUser,
          token: token,
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
