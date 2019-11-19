const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
    //1ère étape: récupérer le token 
    let token = req.headers['x-access-token'];
    // check if  no JWT dans le header de la requete
    if (!token) {
        return res.status(400).send({
            auth: false,
            message: "missing token"
        })
    }
    //JWT n'est pas valide (aps de secret, non complet, expiré etc...)
    jwt.verify(token, "supersecret", function(err, decoded) {
        if (err) {
            console.log(err);
            return res.status(401).send({
                auth: false,
                message: "no authorized"
            })
        }
        next();
    })
}

module.exports = verifyToken;