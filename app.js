

// Dependencies
const express = require('express');
const app = express();
const Joi = require('joi');
const jwt = require('jsonwebtoken');
var bodyParser = require('body-parser')
const usersRoutes = require('./routes/user');
const filesRoutes = require('./routes/files');
const folderRoutes = require('./routes/folder');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;
var upload = require('express-fileupload');
var session = require('express-session');
var cors = require('cors')
const CheckFiles = require('./middleware/checkFiles');
var cookieParser = require('cookie-parser')
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(cookieParser())
app.use(upload());
app.use(cors({
  credentials: true,
}));


io.on('connection', () =>{
  console.log('a user is connected')
 })





app.options("*", function (req, res, next) {
  //those headers used to Access-Control-Allow-Origin CORS 
  res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //other headers here
  res.status(200).end();
});


//  Starting MongoDB connection
mongoose.connect('mongodb://rasheed92:141516qw@ds149414.mlab.com:49414/filez', {
  useNewUrlParser: true
});

//  To Check if the connection works fine or not
mongoose.connection.on('connected', () => {
  console.log('\x1b[36m%s\x1b[0m', 'mongo has been connected...');
});



app.use(bodyParser.urlencoded({
  extended: false
}))

// parse application/json
app.use(bodyParser.json())


// MiddleWare
app.use(express.json());

// app.use('/public',  express.static('/public'),(req, res, next) => {
//   // res.status(400).send('err');
//   next()
// })


// app.use('/public', express.static('/public'))
// For serving images and other static data
// app.use(express.static('public'));

app.use(CheckFiles,(req, res,next) => {

next()
},express.static('public'), );



// app.use(function (req, res, next) {
//   // check for .xls extension
//   console.log(req.originalUrl);
//   next();
// }, express.static('public'));

app.use('/api/user', usersRoutes);
app.use('/api/files', filesRoutes);
app.use('/api/folder', folderRoutes);

// Starting the server
app.listen(PORT, () => {
  console.log('Running on port ' + PORT);
});