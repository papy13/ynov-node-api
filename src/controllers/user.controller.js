const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.create = (req, res) => {
        let hashedPassword = bcrypt.hashSync(req.body.password, 8);
        console.log(hashedPassword);
        const user = new User({
                email: req.body.email,
                password: hashedPassword,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                admin: req.body.admin
            })
            // if (err.error) {
            //     res.send(err);
            // } else {
        user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message
                })
            })
    }
    // get all users
exports.findAll = (req, res) => {
    User.find()
        .then(users => {
            res.send(users);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured when finding users."
            })
        })
}