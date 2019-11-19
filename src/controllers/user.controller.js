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

exports.findOne = (req, res) => {
    console.log(req.params);
    User.findById(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found with id" + req.params.id
                });
            }
            res.send(user);
        })
        .catch(err => {
            return res.status(500).send({
                message: err.message
            })
        })
}

exports.updateOne = (req, res) => {
    User.findByIdAndUpdate(
        req.params.id,
        req.body
    ).then(user => {
        if (!user) {
            return res.status(404).send({
                message: "User not found"
            })
        }
        // res.send(user);
        User.findById(req.params.id)
            .then(newUser => {
                res.send({
                    new_user: newUser,
                    old_user: user
                });
            })
    }).catch(err => {
        return res.status(500).send({
            message: err.message
        })
    })
}

exports.deleteOne = (req, res) => {
    User.findByIdAndRemove(req.params.id)
        .then(user => {
            if (!user) {
                return res.status(404).send({
                    message: "User not found"
                })
            }
            res.send({
                // message: "User with id" + req.params.id + "deleted successfully"
                message: `User with id ${req.params.id} deleted successfully`
            })
        })
}

exports.removeAll = (req, res) => {
    User.deleteMany((err) => {
        if (err) {
            res.send(err)
        }
        res.send('Users removed');
    });
}