const jwt = require('jsonwebtoken');
const User = require('../models/users');

//here to check user limit when he want to upload a new file

function limitChecker(req, res, next) {
  
  const token = req.body.token || req.headers.token
  //  check if there is a token
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

            if (req.files.file) {
              if (req.files.file.data.length > parseInt(user.limit)) {
                res.status(404).send('you have reached the limit please upgrade your package or delete some files')
              } else if (user.package == 'free') {
                if (req.files.file.data.length > 25000000) {
                  res.status(404).send('Maximum file size is 25 MB for free package')
                } else {
                  next()
                }
              } else {
                next()
              }
            } else {
              res.status(404).send('file is required')
            }
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


module.exports = limitChecker;