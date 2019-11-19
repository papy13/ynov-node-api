const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.create = (req, res) => {
    let hashedPassword = bcrypt.hashSync(req.body.password, 8);

    const user = new User({
        email: req.body.email,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        admin: req.body.admin
    })

    user.save()
        .then(data => {
            let usertoken = jwt.sign({
                    id: user.email,
                    admin: user.admin
                },
                "supersecret", {
                    expiresIn: 86400
                }
            )
            res.send({
                auth: true,
                token: usertoken,
                body: {
                    email: data.email,
                    firstname: data.firstname
                }
            });
        })
        .catch(err => {
            res.status(500).send({
                message: err.message
            })
        })
}

exports.login = (req, res) => {
    //requête pour retrouver un user en BDD -> findOne
    // bcrypt.compareSync(mot de passe envoyé , mot de passe en base de données);

}