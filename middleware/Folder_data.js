const jwt = require('jsonwebtoken');
const Files = require('../models/files');

function Folder_data(req, res, next) {
  //  check if there is a token


  const token = req.body.token || req.headers.token
  if (token) {
    {
      //  decode the token and chekc if it's validate
      try {
        //  Get the payload from the jsonwebtoken

        var payload = jwt.verify(token, 'z3bool');
        Files.find({
          folder: req.params.id,
          main: 0,
          user: req.session_data._id,
          bin: false,
        }, {
      }, // projection
      function (err, user) {
        if (err) return res.status(500).send("There was a problem finding the user.");
        if (!user) return res.status(404).send("No user found.");
        
        req.Folder =user;
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


module.exports = Folder_data;