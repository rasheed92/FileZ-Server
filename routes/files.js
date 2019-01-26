// Dependencies
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const Files = require('../models/files');
const user = require('../models/users');
const fileUpload = require('express-fileupload');
const uuidv1 = require('uuid/v1');
const Session_data = require('../middleware/session_data');
var multer = require('multer')
const LimitChecker = require('../middleware/limit');
const FilesMW = require('../middleware/FilesMW');
var cors = require('cors')
const fs = require('fs');
const User = require('../models/users');
const app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var upload = multer()




// add new file 
router.post('/add', Session_data, LimitChecker, (req, res) => {
  const validating = FileValidating(req.body);
  if (validating.error) {
    console.log(validating.error.details[0].message)
    res.status(400).send(validating.error.details[0].message);
  } else {
    let path = `./public/`;

    //not working on heroku
    // let path = `./public/${req.session_data._id}`;
    // if (!fs.existsSync(path)) {
    //     fs.mkdirSync(path);
    // }
    var FolderChaek;
    if (req.body.folder == "Main Folder") {
      FolderChaek == ''
    } else {
      FolderChaek = req.body.folder
    }
    let main;
    if (FolderChaek) {
      main = 0;
    } else {
      main = 1;
    }
    var file = req.files.file;
    var changetype = file.mimetype.split("/", 1);
    var type;
    if (changetype == 'image') {
      type = changetype;
      console.log(changetype);
    } else if (changetype == 'video') {
      type = changetype;
    } else {
      type = file.mimetype;
      console.log('changetype');
    }
    var currentDate = new Date();
    var date = currentDate.getDate();
    var month = currentDate.getMonth();
    var year = currentDate.getFullYear();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var seconds = currentDate.getSeconds();
    var dateString = date + "/" + (month + 1) + "/" + year + " "+hours+":"+minutes;

    name = file.name;
    var FileUud = uuidv1();

    //not working on heroku
    // var Filepath = path +'/'+ FileUud + name;
    var Filepath = path + FileUud + name;
    var urlFile = FileUud + name;
    file.mv(Filepath)
    const files = new Files({
      user: req.session_data._id,
      name: name,
      size: req.files.file.data.length,
      main: main,
      bin: false,
      folder: FolderChaek,
      type: type,
      public: 1,
      //not working on heroku
      // FilePath:req.session_data._id+'/'+urlFile,
      FilePath: urlFile,
      uptime: dateString,

    });

    files.save()
      global.io.emit('NewFileAdded', files);
// here to update user limit when user add new file
    User.findOneAndUpdate({
        _id: req.session_data._id
      }, {
        $set: {
          "limit": parseInt(req.session_data.limit) - req.files.file.data.length
        }

      },{new: true}).then(result => {
      global.io.emit('userLimitChange', result);
        res.status(200).send("the file has been uploaded successfully")
      }).catch(err => {
        res.status(400).send(err)
      })
  }
});


//this router to get all files 
router.get('/', cors(), Session_data, (req, res) => {
  //those headers used to Access-Control-Allow-Origin CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  Files.find({
      user: req.session_data._id,
      main: 1,
      bin: false,

    })
    .sort({ uptime: -1})
    .then(result => {
      let data = [{
        'data': result
      }, {
        'session': req.session_data
      }]
      res.send(data);
    }).catch(err => {
      res.status(400).send(err)
    })
})


//this router to move  file to folder
router.post('/move/:id', FilesMW, (req, res) => {

  //Validating on folder id
  if (req.body.folder == 'Main_Folder') {
    Files.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          "main": 1,
        }
      }).then(result => {
        // console.log(result._id)
        global.io.emit('MoveFileToFolder', result._id);
        res.send(`File has been moved`);
      }).catch(err => {
        res.status(400).send(err);
      });
  } else {
    Files.findOneAndUpdate({
        _id: req.params.id
      }, {
        $set: {
          "main": 0,
          "folder": req.body.folder
        }
      }).then(result => {
        global.io.emit('MoveFileToFolder', result._id);
        res.send(`File has been moved`);
      }).catch(err => {
        res.status(400).send(err);
      });
  }
});

//this router use to list the Files on folder id
router.get('/folder/:id', Session_data, (req, res) => {
  Files.find({
      folder: req.params.id,
      main: 0,
      user: req.session_data._id,
      bin: false,
    }).sort({ uptime: -1})
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    })
});



//this router use to get  all Files in bin
router.get('/bin/', Session_data, (req, res) => {
  Files.find({
      "bin": true,
      "user": req.session_data._id
    }).sort({ uptime: -1})
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    })
});




//this router use to delete Files 
router.delete('/bin/:id', FilesMW, Session_data, (req, res) => {
  //those headers used to Access-Control-Allow-Origin
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);
  var Userlimit=parseInt(req.session_data.limit) + req.file_data.size;
  var FIle=req.file_data;

  User.findOneAndUpdate({
    _id: req.session_data._id
  }, {
    $set: {
      "limit": parseInt(req.session_data.limit) + req.file_data.size
    }
  },{new: true}).then(result => {
    global.io.emit('userLimitChange', result);
  global.io.emit('DeletedFile', FIle);
    res.status(200).send(`the file has been deleted`)
  }).catch(err => {
    res.status(400).send(err);

  });
});


//this router use to send  Files to bin
router.post('/bin/add/:id', FilesMW, (req, res) => {
  console.log(req.params.id)
  Files.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        "bin": true,
      }
    })
    .then(result => {
      // console.log(result)
      global.io.emit('MoveFileToTrash', result);
      res.send(`File has been move to trash `);
    }).catch(err => {
      res.status(400).send(err);
    });
  // }
});

//this router use to recovery  Files from bin
router.post('/bin/:id', FilesMW, (req, res) => {
  console.log(req.params.id)
  Files.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: {
        "bin": false,
      }
    })
    .then(result => {
      global.io.emit('RecoveryFileFromTrash', result);
      
      res.send(`File has been Recovery `);
    }).catch(err => {
      res.status(400).send(err);
    });
  // }
});

//this function used for Validating
function FileValidating(Files) {
  const FilesSchema = {
    // 'size': Joi.number().required(),
    'folder': Joi.string(),
    'public': Joi.number().required(),
    // 'files': Joi.required(),
    'token': Joi.string(),
  }
  return Joi.validate(Files, FilesSchema);
}


module.exports = router;