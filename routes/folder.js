const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Folder = require('../models/folder');
const Session_data = require('../middleware/session_data');




// this router used to get all folder to user by useing Session_data middleware
router.get('/', Session_data,(req, res) => {
    Folder.find({
        user: req.session_data._id
      })
      .then(result => {
        res.send(result);
      }).catch(err => {
        res.status(400).send(err)
      })
  })


// this router used to add folder 
router.post('/add', Session_data, (req, res) => {
  const folder = new Folder({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    user: req.session_data._id,
  });
  folder.save().then(result => {
    res.send(result);

  }).catch(err => {
    res.send(err);
  })
});


module.exports = router;