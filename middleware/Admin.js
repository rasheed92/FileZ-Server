const jwt = require('jsonwebtoken');
const Files = require('../models/files');
const User = require('../models/users');
function Admin(req, res, next) {
  //  check if there is a token


  const token = req.body.token || req.headers.token
  if (token) {
    {
      //  decode the token and chekc if it's validate
      try {
        //  Get the payload from the jsonwebtoken

        let payload = jwt.verify(token, 'z3bool');
        // res.status(200).send(payload);
        //  You can check the expiration if you want
        User.findById(payload.id, {
          password: 0
        }, // projection
        function (err, user) {
          if (err) return res.status(500).send("There was a problem finding the user.");
          if (!user) return res.status(404).send("No user found.");
        
          if (user.role == 1) {
            next();
          }else{
            res.send('Sorry you are not A Admin');
          }
        
        });
      } catch (err) {
        res.status(400).send(err);
        console.log(err)
      }

    }

  } else {
    res.send('You are Not Login');
  }


}


module.exports = Admin;