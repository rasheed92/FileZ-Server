const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Folder = require('../models/folder');
const Session_data = require('../middleware/session_data');
const folder_data = require('../middleware/Folder_data');
const DeleteFolder = require('../middleware/DeleteFolder');
const app = express();
const Files = require('../models/files');

// this router used to get all folder to user by useing Session_data middleware

router.get('/',Session_data,(req, res) => {
    Folder.find({
        user: req.session_data._id,
        root: true
      })
      .then(result => {
        res.send(result);
      }).catch(err => {
        res.status(400).send(err)
      })
  })


  router.get('/folder/:id', Session_data,folder_data, (req, res) => {

  var files=[]
//   Files.find({  folder: req.params.id,}).exec(function(err, coupons) { 
//     files=coupons
// })
Folder.find({
        folder: req.params.id,
        user: req.session_data._id,
      }).then(result => {
        let data = [{
          'Folder': result
        }, {
          'Files': req.Folder
        }]
        res.send(data);
      }).catch(err => {
        res.send(err);
      })
      
  });
  
  // router.get('/:id', Session_data, (req, res) => {
  //   Folder.find({
  //       folder: req.params.id,
  //     })
  //     .then(result => {
  //       res.send(result);
  //     }).catch(err => {
  //       res.send(err);
  //     })
  // });
  router.delete('/:id', DeleteFolder,(req, res) => {
    Folder.findOneAndDelete({
      _id: req.params.id
    }, function (err) {}).then(result => {
      res.status(200).send('folder has been removed successfully');
      global.io.emit('DeleteFolder', req.params.id);
    }).catch(err => {
      res.send(err);
    })
  });
// this router used to add folder 
router.post('/add', Session_data, (req, res) => {
  var rootCheck;
  if (!req.body.name) {
    res.status(400).send('folder name is required');
  }
  if (req.body.folder) {
    rootCheck=false
  }else{
    rootCheck=true
  }
  const folder = new Folder({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    folder:req.body.folder,
    user: req.session_data._id,
    root:rootCheck
  });
  folder.save().then(result => {
    app.io = result;
    global.io.emit('AddNewFolder', result);
    res.send(result);

  }).catch(err => {
    // res.status(404).send(err);
  })
});



module.exports = router;