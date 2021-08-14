
const { body, validationResult } = require('express-validator');


module.exports = (req, res, next) => {

    body('username').isEmail(),
    // password must be at least 5 chars long
    body('password').isLength({ min: 5 }),
    (req, res) => {
      // Finds the validation errors in this request and wraps them in an object with handy functions
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    }
    // definir les type de donne
    const schema = Joi.object().keys({
        firstname: Joi.string().min(4).required(),
        name: Joi.string().min(4).required(),
        email: Joi.string().email().required(),
        password: Joi.string()
          .min(8)
          // .regex(
          //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          // )
          .required(),
        date: Joi.date().required(),
        sexe: Joi.string().required(),
      });
  
      // Tester les le donne si est conforme 
      Joi.validate(
        {
          firstname: req.body.firstname,
          name:req.body.name,
          email: req.body.email,
          date: req.body.dateNaissance,
          password: req.body.password,
          sexe: req.body.sexe,
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
        //   return res.status(200).json({
        //     error: "kcdkdfjk"
        //   })
        }
      );
}