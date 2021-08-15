const User = require ('../../models/user') ;
const jwt = require('jsonwebtoken');
require('dotenv').config();



const UpdateUser = async (req, res) => {

    const _firstname = req.body.firstname
    const _name = req.body.name
    const _date = req.body.dateNaissance;
    const _sexe = req.body.sexe;

    const _token = req.params.token;
    const secretToken = process.env.ACCESS_TOKEN_SECRET ;


    if(_firstname || _name || _date || _sexe)
    {
        // verify et decode le token pour chercher l'email  
        jwt.verify(_token, secretToken, (eror, decoded) => {

            if (eror) {
                if (eror.message = "invalid token"){
                    return res.status(401).json({
                        error: true,
                        message: 'Le token envoyer n existe pas',
                    });
                }
                return res.status(401).json({
                    error: true,
                    message: "Votre token n'ai plus valide ,veuille le reinitialise",
                });
            
            }

            if (decoded){
                const _email = decoded.email;
                
                User.findOne({email: _email}, (error, user) => {
                    if (!user) {
                        return res.status(404).json({
                          error: true,
                          message: 'user introuvable',
                        });
                    }
                    
                    if (user) {
                        user.firstname = _firstname ? _firstname : user.firstname;
                        user.name = _name ? _name : user.name;
                        user.date_naissance = _date ? _date : user.date_naissance;
                        user.sexe = _sexe ? _sexe : user.sexe;

                        user.save((error) => {
                            if (error) {
                                return res.status(400).json({
                                    error: true,
                                    message: "erreur lors de l'enregistrement dans le base de donnee",
                                    errors: error,
                                });
                            }
                            return res.status(200).json({
                                error: false,
                                message: "L'utilisateur a ete modifier",
                              });
                        })
                    }
                })
            }
        
        })
    } else{
        return res.status(401).json({
            error: true,
            message: "Aucun donne n'a ete envoyee",
        });

    }
};

module.exports = UpdateUser;
