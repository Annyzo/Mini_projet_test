const User = require ('../../models/user') ;
const jwt = require('jsonwebtoken');
require('dotenv').config();



const ShowAllUser =  (req, res) => {
  const _token = req.params.token;
  const secretToken = process.env.ACCESS_TOKEN_SECRET ;


  // verify et decode le token pour chercher l'email
  
  jwt.verify(_token, secretToken, async(eror, decoded) => {

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
        const user_all = await User.find({},{_id:0}).select('firstname lastname email sexe')

        return res.status(200).json({
        error: false,
        user_all
        });
    }

   
  })
};

module.exports = ShowAllUser;
