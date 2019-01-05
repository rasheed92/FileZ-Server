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
const jwt = require('jsonwebtoken');
const LimitChecker = require('../middleware/limit');
var cors = require('cors')
const fs = require('fs');
const User = require('../models/users');


router.post('/add',Session_data, LimitChecker,(req, res) => {
  const validating = FileValidating(req.body);
  if (validating.error) {
    res.status(400).send(validating.error);
  } else {

    let path = `./public/${req.session_data._id}`;
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
   
    var file = req.files.file,
      name = file.name,
      type = file.mimetype;
    var FileUud = uuidv1();
    var Filepath = path +'/'+ FileUud + name;
    var urlFile = FileUud + name;
    file.mv(Filepath)
    const files = new Files({
      user: req.session_data._id,
      name: name,
      size: req.body.size,
      folder:req.body.folder,
      type: type,
      public: req.body.public,
      FilePath:req.session_data._id+'/'+urlFile,
      uptime: new Date().getTime(),

    });
 files.save()
 User.updateOne({
  _id: req.session_data._id
}, {
  $set: {
    "limit": req.session_data.limit-req.body.size
  }
})
 .then(result => {
      res.status(200).send("the file has been uploaded successfully")
    }).catch(err => {
      res.status(400).send(err)
    })
  }


});


//this router to get all book
router.get('/', cors(), Session_data,(req, res) => {
    //those headers used to Access-Control-Allow-Origin CORS 
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Credentials', true);


  var sorted = req.query.sort;

  //session var used to return user info by useing jwt token

  //here if there is any query for search and sort
  if (req.query.q) {
    if (sorted) {
      Files
        .find({
          "title": req.query.q,
        }).sort(sorted)


        .then(result => {
          let data = [{
            'data': result
          }, {
            'session': req.session_data
          }]

          res.send(data);
          // console.log(result)
        }).catch(err => {
          // console.log(err)
          res.status(400).send(err)
        })
    } else {
      //here if there is  query for search 
      Files
        .find({
          "title": req.query.q,
        })


        .then(result => {
          let data = [{
            'data': result
          }, {
            'session': req.session_data
          }]
          res.send(data);
          // console.log(result)
        }).catch(err => {
          // console.log(err)
          res.status(400).send(err)
        })
    }



  } else {
    //here if there is only sort query 
    if (sorted) {
      //  console.log('+'+sorted)
      Files.find()
        .sort(sorted)
        .then(result => {

          let data = [{
            'data': result
          }, {
            'session': req.session_data
          }]
          res.send(data);
          // console.log(result)
        }).catch(err => {
          // console.log(err)
          res.status(400).send(err)
        })
    } else {
      console.log()
      //here without any query 
      Files.find({
        user:req.session_data._id
    })
    .populate('user')

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
    }

  }

})




//this router use to list the Files on folder id
router.get('/folder/:id', (req, res) => {
  Files.find({
    folder: req.params.id
    })
    .populate('folder')
    .then(result => {
      res.send(result);
    }).catch(err => {
      res.send(err);
    })
});






























// //this router to get all book
// router.get('/', cors(), (req, res) => {
//     //those headers used to Access-Control-Allow-Origin CORS 
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Credentials', true);


//   var sorted = req.query.sort;

//   //session var used to return user info by useing jwt token
//   var session
//   var token = req.headers.token


//   if (token) {
//     if (token) {
//       try {

//         let payload = jwt.verify(token, 'z3bool');

//         session = payload;
//       } catch (err) {
//         session = {
//           'name': 'Guest'
//         };
//         console.log()

//       }
//     }
//   } else {
//     session = {
//       'name': 'Guest'
//     };
//   }

//   //here if there is any query for search and sort
//   if (req.query.q) {
//     if (sorted) {
//       Book
//         .find({
//           "title": req.query.q,
//         }).sort(sorted)


//         .then(result => {
//           let data = [{
//             'data': result
//           }, {
//             'session': session
//           }]

//           res.send(data);
//           // console.log(result)
//         }).catch(err => {
//           // console.log(err)
//           res.status(400).send(err)
//         })
//     } else {
//       //here if there is  query for search 
//       Book
//         .find({
//           "title": req.query.q,
//         })


//         .then(result => {
//           let data = [{
//             'data': result
//           }, {
//             'session': session,
//           }]
//           res.send(data);
//           // console.log(result)
//         }).catch(err => {
//           // console.log(err)
//           res.status(400).send(err)
//         })
//     }



//   } else {
//     //here if there is only sort query 
//     if (sorted) {
//       //  console.log('+'+sorted)
//       Book.find()
//         .sort(sorted)
//         .then(result => {

//           let data = [{
//             'data': result
//           }, {
//             'session': session
//           }]
//           res.send(data);
//           // console.log(result)
//         }).catch(err => {
//           // console.log(err)
//           res.status(400).send(err)
//         })
//     } else {
//       //here without any query 
//       Book.find()
//         .then(result => {


//           let data = [{
//             'data': result
//           }, {
//             'session': session
//           }]
//           res.send(data);
//         }).catch(err => {
//           res.status(400).send(err)
//         })
//     }

//   }

// })

// //this router use to delete book with admin middleware
// router.delete('/:id', Admin, (req, res) => {
//   //those headers used to Access-Control-Allow-Origin
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Accept');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.header('Access-Control-Allow-Credentials', true);

//   Book.remove({
//     _id: req.params.id
//   }).then(result => {
//     res.status(200).send(`the book has been deleted`)
//   }).catch(err => {
//     res.status(400).send(err);

//   });
// });


// //this router use to add book with admin middleware
// router.post('/add', Admin, (req, res) => {
//   console.log(req.body)
//   const validating = bookValidating(req.body);
//   if (validating.error) {
//     res.status(400).send(validating.error);
//   } else {
//     var file = req.files.file,

//       name = file.name,
//       type = file.mimetype;
//     var FileUud = uuidv1();
//     var Filepath = './public/' + FileUud + name;
//     var urlFile = FileUud + name;
//     const URl = req.originalUrl;
//     const backURL = req.header('Referer') || '/';

//     file.mv(Filepath)

//     var bookImg = req.files.BookCover,
//       name = bookImg.name,
//       type = bookImg.mimetype;
//     var bookImgUud = uuidv1();
//     var bookImgPath = './public/' + bookImgUud + name;
//     var urlimg = bookImgUud + name;
//     bookImg.mv(bookImgPath)
//     const book = new Book({
//       category: req.body.category_id,
//       title: req.body.title,
//       description: req.body.description,
//       pages: req.body.pages,
//       author: req.body.author,
//       downloads: 0,
//       file: urlFile,
//       bookImg: urlimg,
//       fileSize: req.body.fileSize,
//       PublishedAt: req.body.PublishedAt,
//       uptime: new Date().getTime(),

//     });
//     book.save().then(result => {
//       res.status(200).send(result)
//     }).catch(err => {
//       res.send(err)
//     })
//   }


// });
// //this router use to edit book with admin middleware
// router.post('/edit/:id', Admin, (req, res, next) => {
//   console.log(req.body)
//   const validating = bookValidating(req.body);
//   if (validating.error) {

//     res.status(400).send(validating.error);
//   } else {
//     var file = req.files.file,

//       name = file.name,
//       type = file.mimetype;
//     var FileUud = uuidv1();
//     var Filepath = './public/' + FileUud + name;
//     var urlFile = FileUud + name;
//     const URl = req.originalUrl;
//     const backURL = req.header('Referer') || '/';

//     file.mv(Filepath)

//     var bookImg = req.files.BookCover,
//       name = bookImg.name,
//       type = bookImg.mimetype;
//     var bookImgUud = uuidv1();
//     var bookImgPath = './public/' + bookImgUud + name;
//     var urlimg = bookImgUud + name;
//     bookImg.mv(bookImgPath);



//     Book.updateOne({
//           _id: req.params.id
//         },

//         {
//           $set: {

//             "downloads": req.body.downloads,
//             "category": req.body.category_id,
//             "title": req.body.title,
//             "description": req.body.description,
//             "pages": req.body.pages,
//             "author": req.body.author,
//             "file": urlFile,
//             "bookImg": urlimg,
//             "fileSize": req.body.fileSize,
//             "PublishedAt": req.body.publishedAt,

//           }
//         }
//       )
//       .then(result => {
//         res.status(200).send(result);
//       }).catch(err => {
//         res.status(400).send(err);
//       });
//   }
// });

// //this router use to increment number of downloads for every book
// router.post('/downloads/:id', (req, res) => {

//   Book.updateOne({
//       _id: req.params.id
//     }, {
//       $set: {
//         "downloads": req.body.downloads
//       }
//     })
//     .then(result => {
//       res.send(`Number of updated users is ${ result.n }`);
//     }).catch(err => {
//       res.status(400).send(err);
//     });
//   // }
// });




// //this router use to list the books on category id
// router.get('/category/:id', (req, res) => {
//   Book.find({
//       category: req.params.id
//     })
//     .populate('category')
//     .then(result => {
//       res.send(result);
//     }).catch(err => {
//       res.send(err);
//     })
// });


//this function used for Validating
function FileValidating(Files) {
  const FilesSchema = {
    'size': Joi.number().required(),
    'folder': Joi.string(),
    'public': Joi.number().required()
  }
  return Joi.validate(Files, FilesSchema);
}


module.exports = router;