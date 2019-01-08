const jwt = require('jsonwebtoken');
const Files = require('../models/files');


function checkfiles(req, res, next) {

    //     // 



    var path = req.originalUrl
    var trimmedPath = path.replace(/^\/+|\/+$/g, '');

    var CleanPath = trimmedPath.replace(/%20/g, ' ');

    console.log(CleanPath)

    Files
        .find({
            FilePath: CleanPath
        }).then(result => {

            if (result) {

                    if (result[0].public == 1) {
                        next()
                    } else {
                        res.status(400).send("sort")
                    }
               
                }else{
                    next()
                }
                
            
        }).catch(err => {


        })


}


module.exports = checkfiles;