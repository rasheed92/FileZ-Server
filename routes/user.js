const express = require('express');
const router = express.Router();
const Joi = require('joi');
const mongoose = require('mongoose');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fileUpload = require('express-fileupload');
const Admin = require('../middleware/Admin');
const checklogin = require('../middleware/CheckLogin');
const Session_data = require('../middleware/session_data');
const uuidv1 = require('uuid/v1');
const Files = require('../models/files');
const fs = require('fs');

const stripe = require("stripe")("sk_test_QK27hUMZEzUtSQjtXsLfwGsa");

//this router for login
router.post('/login', function (req, res) {
  User.findOne({
    email: req.body.email
  }, function (err, user) {
    if (err) {
      return res.status(500).send('Error on the server.');
    }

    if (!user) {
      return res.status(404).send('No user found.');
    } else {
      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    }

    if (!passwordIsValid) {
      return res.status(401).send({
        auth: false,
        token: null
      });
    } else {

    }
    var token = jwt.sign({
      id: user._id,
    }, 'z3bool', {
      expiresIn: 604800 // expires in 1 week
    });

    res.setHeader('token', token)
    res.status(200).send(token);
  });


})

//check user if login
router.get('/checklogin', checklogin, (req, res) => {

  //return data from middleware
  res.status(200).send('token');
});


// register a new User
router.post('/register', (req, res) => {
  console.log(req)
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const validating = userValidating(req.body);
      if (validating.error) {
        res.status(400).send(validating.error);
      } else {
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); 
        var year = currentDate.getFullYear();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();
        var dateString = date + "/" + (month + 1) + "/" + year + " "+hours+":"+minutes;
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          package: 'free',
          limit: 100000000,
          packageSize:100000000,
          email: req.body.email,
          password: hash,
          role: 0,
          porfileImg: 'defaultUser.png',
          uptime: dateString,
        });
        user.save()
          .then(result => {
            var token = jwt.sign({
              id: user._id,
            }, 'z3bool', {
              expiresIn: 604800 // expires in 1 week
            });
            global.io.emit('NewUser', result);
            res.setHeader('token', token)
            res.status(200).send(token);
          })
          .catch(err => {
            res.status(401).send(err);
          });
      }
    });

  });

});



// to get files info by admin !
router.get('/admin/filesinfo', Admin, (req, res) => {
  Files.aggregate([{
    $group: {
      _id: 'files',
      totalFilesUplodedSize: {
        $sum: '$size'
      },
      totalFiles: {
        $sum: 1
      }
    }
  }, ]).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    res.send(err);
  })
});


//get all user by admin
router.get('/admin/users', Admin, (req, res) => {
  User.find().sort({ uptime: -1}).then(result => {

    res.status(200).send(result);
  }).catch(err => {
    res.send(err);
  })
});

//delete user by admin
router.delete('/admin/deleteUser/:id', Admin, (req, res) => {
  var UserID=req.params.id;
  User.deleteOne({
    _id: req.params.id
  }, function (err) {}).then(result => {
    global.io.emit('DeleteUser', UserID);
    res.status(200).send('user has been removed');
  }).catch(err => {
    res.send(err);
  })
});

//add new admin by admin
router.post('/admin/add', Admin, (req, res) => {
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      const validating = userValidating(req.body);
      if (validating.error) {
        res.status(400).send(validating.error);
      } else {
        var currentDate = new Date();
        var date = currentDate.getDate();
        var month = currentDate.getMonth(); 
        var year = currentDate.getFullYear();
        var hours = currentDate.getHours();
        var minutes = currentDate.getMinutes();
        var seconds = currentDate.getSeconds();
        var dateString = date + "/" + (month + 1) + "/" + year + " "+hours+":"+minutes;
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name: req.body.name,
          package: 'free',
          limit: 100000000,
          email: req.body.email,
          password: hash,
          role: 1,
          porfileImg: 'defaultUser.png',
          uptime: dateString,
        });
        user.save()
          .then(result => {
            global.io.emit('NewUser', result);

            res.status(200).send('A new Admin has been Added');
          })
          .catch(err => {
            res.status(401).send(err);
          });
      }
    });

  });
});


// to update User name or pic
router.post('/updatePackage/', Session_data, (req, res) => {

  
  var token = req.body.stripeToken;
  var package = req.body.package;
  var amount;
  if (package=='e') {
    amount=350
  } else if (package=='s') {
    amount=700
  } else{
    amount=1200
  }
console.log(package)
  var charge = stripe.charges.create({
    amount: amount, // create a charge for 1700 cents USD ($17)
    currency: 'usd',
    description: 'Bargain Basement Charge',
    source: token,
  }, function(err, charges) {
    if (err) { 
      console.warn(err) 
    } else {
  var limit;
  var packageName;
if (package=='e') {
  limit=1000000000;
  packageName='economic';
} else if (package=='s') {
  limit=10000000000;
  packageName='standard';
}else {
  limit=100000000000;
  packageName='business';
}

  User.findOneAndUpdate({
    _id: req.session_data._id
  }, {
    $set: {
      "limit": parseInt(req.session_data.limit) + limit,
      "package": packageName,
      "packageSize": parseInt(req.session_data.packageSize) + limit,
    }
  },{new: true}).then(result => {
    console.log(result)
    global.io.emit('userLimitChange', result);
    res.status(200).send("You have upgraded to "+packageName+" class successfully")
  }).catch(err => {
    res.status(400).send(err)
  })

      
    }
  })




});


// to update User name or pic
router.post('/update/', Session_data, (req, res) => {
  //validate name
  var Username;
  if (req.body.name) {
    Username = req.body.name;
  } else {
    Username = req.session_data.name
  }
  //validate porfileImg
  if (req.files) {

    //not working on heroku
    //   let path = `./public/${req.session_data._id}`;
    //   if (!fs.existsSync(path)) {
    //     fs.mkdirSync(path);
    // }
    var file = req.files.file;
    var changetype = file.mimetype.split("/", 1);
    var type;
    if (changetype == 'image') {
      let path = `./public/`;
      name = file.name;
      var FileUud = uuidv1();
      var Filepath = path + '/' + FileUud + name;
       //not working on heroku
      // var urlFile = req.session_data._id+'/'+FileUud + name;
      var urlFile = FileUud + name;
      file.mv(Filepath)
    }else {
      res.status(400).send("Erorr images only allow")
    }

  } else {
     //not working on heroku
    // urlFile=req.session_data.porfileImg

    urlFile =req.session_data.porfileImg
  }
  User.findOneAndUpdate({
    _id: req.session_data._id
  }, {
    $set: {
      "name": Username,
      "porfileImg": urlFile,
    }
  },{new: true}).then(result => {
    console.log(result)
    global.io.emit('UpdateUserProfile', result);
    res.status(200).send("the Profile update successfully")
  }).catch(err => {
    res.status(400).send(err)
  })

});

//  To validate the Add User requestes
function userValidating(user) {
  const userSchema = {
    'name': Joi.string().min(3).required(),
    'email': Joi.string().min(5).required(),
    'password': Joi.string().min(4).required(),
  }
  return Joi.validate(user, userSchema);
}

module.exports = router;