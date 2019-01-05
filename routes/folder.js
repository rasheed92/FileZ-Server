const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Folder = require('../models/folder');
const Admin = require('../middleware/Admin');
const Session_data = require('../middleware/session_data');
const jwt = require('jsonwebtoken');

//this router used to get all


router.get('/test', Session_data,(req, res,next) => {

  res.status(400).send({data: req.session_data});
 
})




router.get('/', Session_data,(req, res) => {

  Folder.find({
    user: req.session_data._id
  })
  .populate('user')
  .then(result => {
    res.send(result);
  }).catch(err => {
    res.status(400).send(err)
  })


})



// this router used to add category by admin 
router.post('/add',Session_data, (req, res) => {
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