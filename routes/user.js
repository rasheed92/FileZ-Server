const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fileUpload = require('express-fileupload');
const Admin = require('../middleware/Admin');
const Session_data = require('../middleware/session_data');
const uuidv1 = require('uuid/v1');



//this router for login
router.post('/login', function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      return res.status(500).send('Error on the server.');
    }

    if (!user) {
      return res.status(404).send('No user found.');
    } else {
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    }

    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null
      });
    } else {

    }
    var token = jwt.sign({
      id: user._id,
    }, 'z3bool', {
      expiresIn: 604800 // expires in 1 week
    });

    res.setHeader('token',token)
    res.status(200).send(token);
  });


})



// register a new User
router.post('/register', (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const validating = userValidating(req.body);
      if (validating.error) {
        res.status(400).send(validating.error);
      } else {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          package:req.body.package,
          limit: req.body.limit,
          email: req.body.email,
          password: hash,
          role: 0,
          porfileImg: 'defaultUser.png'

        });
        user.save()
          .then(result => {

            var token = jwt.sign({
              id: user._id,
            }, 'z3bool', {
              expiresIn: 604800 // expires in 1 week
            });
            res.setHeader('token',token)
            res.status(200).send(token);

          })
          .catch(err => {
            res.status(401).send(err);
          });
      }
    });

  });



});




// to logout
router.get('/logout/logout', (req, res) => {
  res.redirect('/');
});

//  To validate the POST PUT requestes
function userValidating(user) {
  const userSchema = {
    'name': Joi.string().min(3).required(),
    'limit': Joi.number(),
    'email': Joi.string().min(5).required(),
    'password': Joi.string().min(4).required(),
    'package' : Joi.string().required(),
  }
  return Joi.validate(user, userSchema);
}

module.exports = router;