const jwt = require('jsonwebtoken');
const Files = require('../models/files');
const Folder = require('../models/folder');


//here to check file belong to same user when user want to delete the file or move it 
function FilesUpdate(req, res, next) {
  //  check if there is a token

  const token = req.body.token || req.headers.token

  if (token) {
    {
      //  decode the token and chekc if it's validate
      try {
        //  Get the payload from the jsonwebtoken
        var payload = jwt.verify(token, 'z3bool');
        Folder.findById(req.params.id, {},
            function (err, folder) {
              if (err) return res.status(500).send("There was a problem finding the File.");
              if (!folder) return res.status(404).send("No File found.");
                if (folder.user==payload.id) {
                    Files.find({
                        user: payload.id,
                        folder:req.params.id,
                        main:0
                      },
                      function (err, file) {
                        if (err) return res.status(500).send("There was a problem finding the File.");
                        if (!file) return res.status(404).send("No File found.");
                        if (file) {
                            if (file.length!=0) {
                                res.status(400).send('field to delete this folder the folder should be empty this have '+file.length+" file");
                            } else {
                                next()
                            }
            
                    }
               
                      });  
                } else {
                    res.status(200).send("Sorry that is not your folder");
                }
              
        
            })







      } catch (err) {
        res.status(400).send(err);

      }

    }

  } else {
    res.status(404).send('Sorry you need to Login');
  }
}


module.exports = FilesUpdate;