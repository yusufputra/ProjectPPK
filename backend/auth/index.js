const express = require('express');
const options = require('../db/connectionAzure');
const router = express.Router();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');


var knex = require('knex')(options);

const schema = Joi.object().keys({
    username: Joi.string().alphanum().min(3).max(20).required(),
    password: Joi.string().min(8).required()
});

router.get('/', (req, res) => {
    knex.select().from('userAdmin').then(rows => {
        res.status(200).json(rows);
    }).catch((err) => {
        res.status(500).json(err);
    })
});

/*
sent for signup
{
	"username": "nabilah",
	"password": "acilcantik"
}
*/

router.post('/signup', (req, res, next) => {
    let query = "select * from useradmin where username ='" + req.body.username + "'";
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
        knex.schema.raw(query).then(rows => {
            console.log(rows);
            if (rows.length != 0) {
                const error = new Error('Username sudah dibuat');
                res.status(409);
                next(error);
            }
            else {
                console.log(req.body);
                bcrypt.hash(req.body.password, 12).then(async (hashedPassword) => {
                    const newUser = {
                        username: req.body.username,
                        password: hashedPassword
                    };
                    const queryUser = "INSERT INTO useradmin (username,password,rules) values('" + newUser.username + "','" + newUser.password + "',1)"
                    await knex.schema.raw(queryUser);
                })
                res.json({
                    message: 'sukses coy'
                })
            }
        })
    }
    else {
        console.log(result)
        res.json({
            message: "Hello"
        })
    }
})
/* for login
{
	"username": "nabilah",
	"password": "acilcantik"
}

result : {
    "token": "alskda",
    "rules": 2
}
*/

router.post('/login', (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error === null) {
        knex.schema.raw("SELECT * FROM useradmin WHERE USERNAME ='" + req.body.username + "'")
            .then(ress => {
                bcrypt.compare(req.body.password, ress[0].password).then(result => {
                    if (result) {
                        console.log(ress[0]);
                        const payload = {
                            _id: ress[0].idUser,
                            username: ress[0].username,
                            rules: ress[0].rules
                        };
                        console.log(process.env.TOKEN_SECRET);
                        jwt.sign(payload, process.env.TOKEN_SECRET, {
                            expiresIn: '1d'
                        }, (err, token) => {
                            if (err) {
                                res.status(422);
                                const error = new Error(err);
                                next(error);
                            }
                            else {
                                const result = {
                                    token: token,
                                    rules: payload.rules
                                }
                                console.log(result)
                                res.json(result);
                            }
                        });
                    }
                    else {
                        res.status(422);
                        const error = new Error('wrong password');
                        next(error);
                    }
                })
            }).catch(err => {
                res.status(410);
                const error = new Error('Username Not Fond');
                next(error);
            });
    }
});

module.exports = router;