const User = require ('../../models/user') ;
const jwt = require('jsonwebtoken');
require('dotenv').config();



const ShowOneUser = async (req, res) => {
  const _token = req.params.token;
  const secretToken = process.env.ACCESS_TOKEN_SECRET ;


  // verify et decode le token pour chercher l'email
  
  jwt.verify(_token, secretToken, (eror, decoded) => {

    if (eror) {
       if (eror.message = "invalid token"){
        return res.status(400).json({
          error: true,
          message: 'Le token envoyer n existe pas',
        });
       }
       return res.status(400).json({
        error: true,
        message: "Votre token n'ai plus valide ,veuille le reinitialise",
      });
      
    }

    if (decoded){
      const _email = decoded.email;

      User.findOne({email: _email},{_id:0, password:0, updatedAt:0} ,(error, user) => {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: 'user introuvable',
          });
        }

        if (user) {
          return res.status(200).json({
            error: false,
            user
    
          });
        }
      })
    }

   
  })
};

module.exports = ShowOneUser;
