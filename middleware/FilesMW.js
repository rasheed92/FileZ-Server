const jwt = require('jsonwebtoken');
const Files = require('../models/files');
const User = require('../models/users');
const express = require('express');
const app = express();

function FilesUpdate(req, res, next) {
  //  check if there is a token

  const token = req.body.token || req.headers.token

  if (token) {
    {
      //  decode the token and chekc if it's validate
      try {
        //  Get the payload from the jsonwebtoken
        var payload = jwt.verify(token, 'z3bool');
        Files.findById(req.params.id, {},
          function (err, file) {
            if (err) return res.status(500).send("There was a problem finding the File.");
            if (!file) return res.status(404).send("No File found.");
            if (file.user == payload.id) {
              req.file_data = file
              if (req.route.stack[0].method == 'delete') {

                Files.remove({
                  _id: req.params.id
                }, function (err) {})
              }
              next()
            } else {
              res.status(400).send('Sorry that is not your file ');
            }
          });
      } catch (err) {
        res.status(400).send(err);

      }

    }

  } else {
    res.status(404).send('Sorry you need to Login');
  }
}


module.exports = FilesUpdate;