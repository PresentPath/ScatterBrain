/*
* @Author: kuychaco
* @Date:   2015-07-20 15:17:09
* @Last Modified by:   kuychaco
* @Last Modified time: 2015-07-20 15:30:30
*/

'use strict';

var childProcess = require('child_process');

var children = [];
var hiddenLayers = [[10], [10,10], [5,5], [10,5]];

// Set up one child process per core
for (var i=0; i<4; i++) {
  // Create child process and run code in worker.js
  children[i] = childProcess.fork('./worker.js');
  console.log('forked child', i, 'with PID', children[i].pid);

  // Send data to child process
  children[i].send({
    hiddenLayers: hiddenLayers[i]
  });
}