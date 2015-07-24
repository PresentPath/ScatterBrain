/*
* @Author: kuychaco
* @Date:   2015-07-20 15:17:09
* @Last Modified by:   Katrina Uychaco
* @Last Modified time: 2015-07-24 13:17:02
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

    // console.log('data', data.hiddenLayers);

    var children = [];
    var hiddenLayers = [];
    hiddenLayers[0] = data.hiddenLayers1 === '[]' ? [5] : JSON.parse(data.hiddenLayers1);
    hiddenLayers[1] = data.hiddenLayers2 === '[]' ? [5] : JSON.parse(data.hiddenLayers2);
    hiddenLayers[2] = data.hiddenLayers3 === '[]' ? [5] : JSON.parse(data.hiddenLayers3);
    hiddenLayers[3] = data.hiddenLayers4 === '[]' ? [5] : JSON.parse(data.hiddenLayers4);

    // console.log(hiddenLayers);

    // Set up one child process per core
    for (var i=0; i<4; i++) {
      // Create child process and run code in worker.js
      children[i] = childProcess.fork('./worker.js');
      console.log('forked child', i, 'with PID', children[i].pid);
      children[i].networkNum = i + 1;

      // Send data to child process
      children[i].send({
        hiddenLayers: hiddenLayers[i]
      });

      children[i].on('message', function(result) {
        result.networkNum = this.networkNum;
        socket.emit('brain', result);
      });
    }

  });
});








