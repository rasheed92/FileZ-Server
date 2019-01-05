const jwt = require('jsonwebtoken');
const Files = require('../models/files');


function checkfiles(req, res, next) {
  
//     // 
  
  
//     Files
//     .find({
//       "FilePath": '5c30ab270ac48ca25e63be6d/18c4f490-111f-11e9-8b1f-37530ad2c41basset 2.png'
//     }).then(result => {

// if (req.originalUrl=='/'+result[0].FilePath) {
//     console.log(req.originalUrl);
// } else {
//     console.log(req);
//     console.log('/'+result[0].FilePath);
// }
    
//     //   res.send(data);
//       // console.log(result)
//     }).catch(err => {
//       // console.log(err)
//     //   res.status(400).send(err)
//     })
    next()
  
  
  
  
    //  check if there is a token


//   const token = req.body.token || req.headers.token
//   if (token) {
//     {
//       //  decode the token and chekc if it's validate
//       try {
//         //  Get the payload from the jsonwebtoken

//         var payload = jwt.verify(token, 'z3bool');
//         Files.findById(payload.id, {
//         password: 0
//       }, // projection
//       function (err, user) {
//         if (err) return res.status(500).send("There was a problem finding the user.");
//         if (!user) return res.status(404).send("No user found.");
        
//         req.session_data =user;
//         next()
//         // console.log(Session)
//       });

     
 

//       } catch (err) {
//         res.status(400).send(err);
//         console.log(err)
//       }

//     }

//   } else {
//     res.send('Sorry you need to Login');
//   }


}


module.exports = checkfiles;