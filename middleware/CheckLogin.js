const jwt = require('jsonwebtoken');
const User = require('../models/users');

//here to check use auth or not
function checkLogin(req, res, next) {
  const token = req.body.token || req.headers.token
  //  check if there is a token
  if (token) {
    jwt.verify(token, 'z3bool', (err, decoded) => {
      if (err) {
        return res.status(200).send({
          auth: 'notLogin'
        })
      } else {
        req.decoded = decoded;
        User.findById(decoded.id, {
            password: 0
          }, // projection
          function (err, user) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!user) return res.status(404).send("No user found.");
            let data = [{
              auth: 'login'
            }, {
              'sesson': user
            }]
            return res.status(200).send(data)
          });
      }
    });
  } else {
    return res.status(200).send({
      auth: 'notLogin'
    })
  }
}


module.exports = checkLogin;