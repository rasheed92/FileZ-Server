const jwt = require('jsonwebtoken');
const User = require('../models/users');
function Session_data(req, res, next) {
  //  check if there is a token


  const token = req.body.token || req.headers.token
  if (token) {
    {
      //  decode the token and chekc if it's validate
      try {
        //  Get the payload from the jsonwebtoken

        var payload = jwt.verify(token, 'z3bool');
    User.findById(payload.id, {
        password: 0
      }, // projection
      function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        req.session_data =user;
        next()
        // console.log(Session)
      });

     
 

      } catch (err) {
        res.status(400).send(err);
        console.log(err)
      }

    }

  } else {
    res.send('Sorry you need to Login');
  }
}


module.exports = Session_data;