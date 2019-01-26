const express = require('express');
const app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// let hello = (req, res, next) => {
//     io.on('connection', function(socket){
//         console.log('a user connected'+socket.id);
//         socket.on('disconnect', function(){
//           console.log('User Disconnected');
//         });
//         socket.on('example_message', function(msg){
//           console.log('message: ' + msg);
//         });
//       });
//     next();
//   };
  
  
  module.exports = hello;

