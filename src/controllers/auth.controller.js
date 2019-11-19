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
    console.log(req.body);
    User.findOne({ email: req.body.email },
        function(err, user) {
            //si aucun user
            if (!user) return res.status(404).send('user not found');
            //comparaison des mdp
            let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            //check si la comparaison est True
            if (!passwordIsValid) return res.status(401).send({
                auth: false,
                token: null
            });
            //On génère le token grâce à la méthode sign
            let token = jwt.sign({
                    id: user._id,
                    admin: user.admin
                },
                "supersecret", {
                    expiresIn: 86400
                }
            );
            res.status(200).send({
                auth: true,
                token: token,
                data: user
            })
        }
    )
}