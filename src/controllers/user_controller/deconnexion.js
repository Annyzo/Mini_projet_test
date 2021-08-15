const User = require ('../../models/user') ;
const jwt = require('jsonwebtoken');
require('dotenv').config();

const DeconnectUser = async (req, res) => {
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

      User.findOneAndDelete({email: _email}, (error, user) => {
        if (!user) {
            return res.status(404).json({
              error: true,
              message: 'user introuvable',
            });
        }
        
        if (user) {
          return res.status(200).json({
            error: false,
            message: "L'utilisateur a ete deconnect succe"
    
          });
        }
      })
    }

   
  })
};

module.exports = DeconnectUser;
