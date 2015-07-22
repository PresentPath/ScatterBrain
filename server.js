/*
* @Author: kuychaco
* @Date:   2015-07-20 15:17:09
* @Last Modified by:   Katrina Uychaco
* @Last Modified time: 2015-07-21 20:16:12
*/

'use strict';

// Use socket.io to add event listeners to the server
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

// Entry point for server
var path = require('path');
var bodyParser = require('body-parser');
var port = 8000;

http.listen(port, function(){
  console.log('listening on *:'+port);
});

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


// Do algorithmic processing in child processes
var childProcess = require('child_process');

io.on('connection', function(socket) {
  console.log('connection open');
  socket.on('train', function(data) {

    console.log('data', data.hiddenLayers);

    var children = [];
    var hiddenLayers = data.hiddenLayers === '' ? [[10], [10,10], [5,5], [10,5]] : JSON.parse(data.hiddenLayers);

    console.log(hiddenLayers);

    // Set up one child process per core
    for (var i=0; i<4; i++) {
      // Create child process and run code in worker.js
      children[i] = childProcess.fork('./worker.js');
      console.log('forked child', i, 'with PID', children[i].pid);

      // Send data to child process
      children[i].send({
        hiddenLayers: hiddenLayers[i]
      });

      children[i].on('message', function(result) {
        socket.emit('brain', result);
      });
    }

  });
});








